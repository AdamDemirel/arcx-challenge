'use client'

import Calendar from 'react-calendar'
import { useCalendar } from "../hooks/useCalendar"
import { styles } from './styles'
import { Spinner } from './Spinner'
import { NextArrow, PrevArrow } from "./Arrows"
import "../styles/calendar.css"

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
    shortWeekydayFormatter,
    monthFormatter,
    calendarValue,
    isLoading,
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
              className={styles.dateBtn({ hasDate: !!formattedBtnDate })}
              onClick={toggleCalendar}
              style={styles.customDateIcon}
            >
              {isLoading ? <Spinner /> : formattedBtnDate || 'from - to'}
            </button>
          </div>
          {showCalendar && (
            <Calendar
              defaultView='month'
              value={calendarValue}
              minDetail='decade' // dont show centuries
              selectRange // allows range selection
              allowPartialRange // calls onChange on just startDate
              minDate={new Date()} // disables dates before today
              onChange={handleDateChange}
              inputRef={calendarRef} // used for outside click
              formatMonth={monthFormatter}
              formatShortWeekday={shortWeekydayFormatter}
              calendarType='gregory' // starts cal at sun > mon
              next2Label={null} // hide next year arrow
              prev2Label={null} // hide prev year arrow
              nextLabel={<NextArrow />}
              prevLabel={<PrevArrow />}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default Home
