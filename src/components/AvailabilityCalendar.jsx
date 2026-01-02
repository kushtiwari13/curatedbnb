import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import styles from './AvailabilityCalendar.module.css'
import { doesRangeOverlap } from '../services/availability'

const AvailabilityCalendar = ({ range, onSelect, unavailableRanges }) => {
  const disabledDays = unavailableRanges.map(({ start, end }) => ({ from: start, to: end }))

  const handleSelect = (selectedRange) => {
    if (!selectedRange?.from || !selectedRange?.to) {
      onSelect(selectedRange)
      return
    }
    if (doesRangeOverlap(selectedRange.from, selectedRange.to, unavailableRanges)) {
      return
    }
    onSelect(selectedRange)
  }

  return (
    <div className={styles.calendar}>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        disabled={disabledDays}
        modifiersClassNames={{
          selected: styles.selected,
          disabled: styles.disabled,
          range_middle: styles.range,
          range_start: styles.selected,
          range_end: styles.selected,
          today: styles.today,
        }}
        classNames={{
          caption: styles.caption,
          day: styles.day,
        }}
      />
    </div>
  )
}

export default AvailabilityCalendar
