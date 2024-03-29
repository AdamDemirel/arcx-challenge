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
    formattedBtnDate,
    toggleCalendar,
    handleDateChange,
    calendarRef,
  } = useCalendar()

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <p className={styles.dateLabel}>
            {labels.inputLabel}
          </p>
          <div
            className={styles.btnWrapper(showCalendar)}
          >
            <button
              className={styles.dateInput({ hasDate: !!formattedBtnDate })}
              onClick={toggleCalendar}
              style={styles.customDateIcon}
            >
              {formattedBtnDate || 'from - to'}
            </button>
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
        </div>
      </div>
    </main>
  );
}

export default Home
