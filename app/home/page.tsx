'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCalendar } from "../hooks/useCalendar"
import { styles } from '../styles/calendar'

const labels = {
  inputLabel: 'Time Period',
}

const Home = () => {
  const {
    showCalendar,
    formattedInputDate,
    toggleCalendar,
    handleDateChange,
    calendarRef,
  } = useCalendar()

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form}>
          <label
            htmlFor="time-period"
            className={styles.dateLabel}
          >
            {labels.inputLabel}
          </label>

          <div
            className={styles.inputWrapper(showCalendar)}
          >
            {/* Using type text instead of date since the input is merely reflective of the calendar and no need for native date functionality */}
            <input
              type="text"
              name="time-period"
              id="time-period"
              className={styles.dateInput}
              value={formattedInputDate}
              placeholder='dd/mm/yyyy - dd/mm/yyyy'
              onClick={toggleCalendar}
              style={styles.customDateIcon}
              readOnly
            />
          </div>
          {showCalendar && (
            <div className={styles.calendarWrapper}>
              <Calendar
                // onClick={(value: any) => alert('new value' + value)}
                defaultView='month'
                minDetail='decade' // dont show centuries
                selectRange // allows range selection
                allowPartialRange // calls onChange on just startDate
                minDate={new Date()} // disables dates before today
                onChange={handleDateChange}
                inputRef={calendarRef}
              />
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default Home
