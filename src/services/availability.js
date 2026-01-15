const normalizeDate = (date) => {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

const fallbackRanges = [
  { start: normalizeDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), end: normalizeDate(new Date(Date.now() + 9 * 24 * 60 * 60 * 1000)) },
  { start: normalizeDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)), end: normalizeDate(new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)) },
  { start: normalizeDate(new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)), end: normalizeDate(new Date(Date.now() + 31 * 24 * 60 * 60 * 1000)) },
]

const proxyBase = import.meta.env.VITE_ICAL_PROXY

const parseDateLine = (line) => {
  const [, value] = line.split(':')
  if (!value) return null

  const trimmed = value.trim()
  if (/^\d{8}$/.test(trimmed)) {
    const year = Number(trimmed.slice(0, 4))
    const month = Number(trimmed.slice(4, 6)) - 1
    const day = Number(trimmed.slice(6, 8))
    return { date: normalizeDate(new Date(year, month, day)), isDateOnly: true }
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return null
  return { date: normalizeDate(parsed), isDateOnly: false }
}

const parseICal = (text) => {
  const events = []
  let current = {}

  text.split(/\r?\n/).forEach((line) => {
    if (line.startsWith('DTSTART')) {
      const parsed = parseDateLine(line)
      current.start = parsed?.date
    }
    if (line.startsWith('DTEND')) {
      const parsed = parseDateLine(line)
      if (parsed?.date) {
        const endDate = new Date(parsed.date)
        if (parsed.isDateOnly) {
          endDate.setDate(endDate.getDate() - 1)
        }
        current.end = normalizeDate(endDate)
      }
    }
    if (line.startsWith('END:VEVENT')) {
      if (current.start && current.end) {
        events.push(current)
      }
      current = {}
    }
  })

  return events
}

export const getUnavailableDateRanges = async (icalUrl) => {
  const tryFetch = async (url) => {
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw new Error(`iCal fetch failed with status ${response.status}`)
    const text = await response.text()
    const parsed = parseICal(text)
    if (!parsed.length) throw new Error('iCal parsed but returned empty set')
    return parsed
  }

  try {
    return await tryFetch(icalUrl)
  } catch (error) {
    if (proxyBase) {
      try {
        return await tryFetch(`${proxyBase}?url=${encodeURIComponent(icalUrl)}`)
      } catch (proxyError) {
        console.warn('Proxy attempt failed, falling back to mock data.', proxyError)
      }
    } else {
      console.warn('Direct iCal fetch failed; set VITE_ICAL_PROXY to enable proxy.', error)
    }
    return fallbackRanges
  }
}

export const isDateUnavailable = (date, unavailableRanges = []) => {
  const day = normalizeDate(date)
  return unavailableRanges.some(
    ({ start, end }) => day.getTime() >= start.getTime() && day.getTime() <= end.getTime(),
  )
}

export const doesRangeOverlap = (start, end, unavailableRanges = []) => {
  if (!start || !end) return false
  const rangeStart = normalizeDate(start)
  const rangeEnd = normalizeDate(end)

  return unavailableRanges.some(({ start: blockedStart, end: blockedEnd }) => {
    return (
      (rangeStart >= blockedStart && rangeStart <= blockedEnd) ||
      (rangeEnd >= blockedStart && rangeEnd <= blockedEnd) ||
      (rangeStart <= blockedStart && rangeEnd >= blockedEnd)
    )
  })
}
