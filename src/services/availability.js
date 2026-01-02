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
  return normalizeDate(new Date(value))
}

const parseICal = (text) => {
  const events = []
  let current = {}

  text.split(/\r?\n/).forEach((line) => {
    if (line.startsWith('DTSTART')) {
      current.start = parseDateLine(line)
    }
    if (line.startsWith('DTEND')) {
      current.end = parseDateLine(line)
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
