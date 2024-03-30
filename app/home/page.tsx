'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useCalendar } from "../hooks/useCalendar"
import { styles } from '../styles/calendar'
import Image from 'next/image'
import { Spinner } from '../components/Spinner'

const labels = {
  inputLabel: 'Time Period',
}

const NextArrow = () => (
  <Image src='/arrow.svg' alt='next arrow' width={16} height={16} style={{ transform: 'rotate(180deg)'}} />
)

const PrevArrow = () => (
  <Image src='/arrow.svg' alt='prev arrow' width={16} height={16}  />
)

const DownArrow = () => (
  <Image src='/arrow.svg' alt='down arrow' width={16} height={16} style={{ transform: 'rotate(90deg)'}} />
)

const Home = () => {
  const {
    showCalendar,
    formattedBtnDate,
    toggleCalendar,
    handleDateChange,
    calendarRef,
    shortWeekydayFormatter,
    monthFormatter,
    selectedDates,
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
            <div className={styles.calendarWrapper}>
              <Calendar
                defaultView='month'
                // @ts-ignore-next-line
                value={selectedDates}
                minDetail='decade' // dont show centuries
                selectRange // allows range selection
                allowPartialRange // calls onChange on just startDate
                minDate={new Date()} // disables dates before today
                onChange={handleDateChange}
                inputRef={calendarRef}
                formatMonth={monthFormatter}
                formatShortWeekday={shortWeekydayFormatter}
                calendarType='gregory' // starts cal at sun > mon
                next2Label={null} // hide next year
                prev2Label={null} // hide prev year
                nextLabel={<NextArrow />}
                prevLabel={<PrevArrow />}
                // tileContent do custom date tile comp here for selected month
                //
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home
