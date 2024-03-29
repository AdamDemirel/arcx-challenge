'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const labels = {
  inputLabel: 'Time Period',
}

const styles = {
  container: 'min-h-screen flex items-center justify-center py-12 px-[60px]',
  formWrapper: 'border border-gray-200 rounded-lg py-3.5 px-8 w-full max-w-[420px] text-sm font-regular relative',
  form: 'flex flex-col border-b border-gray-200',
  dateLabel: 'text-stone-500',
  dateInput: 'border border-gray-200 rounded p-2 text-gray-950 w-full focus:outline-none',
  calendarWrapper: 'absolute top-24 opacity-0 animate-fadein',
  // The purple border is on the input wrapper to prevent layout shift on the input from 1-2px border-width change
  inputWrapper: (showCal: boolean) => `mt-2 mb-6 border-2 rounded border-white ${showCal ? 'border-violet-700' : ''}`,
  // Adds a custom calendar icon for the date input as per spec
  customDateIcon: {
    backgroundSize: '16px',
    paddingRight: '16px', /* space to accomodate the icon */
    backgroundImage: "url('/calendar.svg')",
    backgroundRepeat: 'no-repeat',
    /* Adds padding to the right of the icon */
    backgroundPosition: 'calc(100% - 12px) center'
  }
}

const Home = () => {
  const [showCalendar, setShowCalendar] = useState(false)

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
              // value="2018-07-22"
              value=''
              placeholder='dd/mm/yyyy'
              onFocus={() => setShowCalendar(true)}
              style={styles.customDateIcon}
            />
          </div>
          {showCalendar && (
            <div className={styles.calendarWrapper}>
              <Calendar />
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

export default Home
