'use client'

import { useMemo, useState, useEffect, useRef } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns/format'
import { useClickedOutside } from '../hooks/useClickedOutside'

// Toggle this to enable debug logs
const DEBUG = true

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

const dateFormat = 'MMM do yyyy'

// TODO: type this as Date | null | ?range = [Date, ?Date]
type DateValue = any

const Home = () => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  // 'Nov 8th 2023 - Dec 5th 2023'
  const [selectedDate, setSelectedDate] = useState<DateValue>(null)

  const calendarRef = useRef(null)
  const { clickedOutside } = useClickedOutside({ calendarRef, showCalendar })

  const handleDateChange = (dates: any) => {
    setSelectedDate(dates)
  }

  const formattedStartDate = useMemo(() => {
    const hasStartDate = !!selectedDate?.[0]
    if (hasStartDate) return format(selectedDate?.[0], dateFormat)
    return ''
  }, [selectedDate])


  const formattedEndDate = useMemo(() => {
    const hasEndDate = !!selectedDate?.[1]
    if (hasEndDate) return format(selectedDate?.[1], dateFormat)
    return ''
  }, [selectedDate])


  const formattedInputDate = useMemo(() => {
    if (!formattedStartDate && !formattedEndDate) return ''
    if (formattedStartDate && !formattedEndDate) return formattedStartDate
    if (formattedStartDate && formattedEndDate) {
      return `${formattedStartDate} - ${formattedEndDate}`
    }
  }, [formattedStartDate, formattedEndDate])

  // Logs all state and variables for debugging
  useEffect(() => {
    if (!DEBUG) return
    console.log('showCalendar', showCalendar)
    console.log('selectedDate', selectedDate)
    console.log('formattedStartDate', formattedStartDate)
    console.log('formattedEndDate', formattedEndDate)
    console.log('formattedInputDate', formattedInputDate)
    console.log('clickedOutside', clickedOutside)
  }, [formattedEndDate, formattedStartDate, selectedDate, showCalendar, formattedInputDate, clickedOutside])

  // closes the calendar if its open, and the user clicks outside,
  // or if a 2nd date is selected
  useEffect(() => {
    const rangeSelected = selectedDate?.[0] && selectedDate?.[1]
    if (showCalendar && clickedOutside) setShowCalendar(false)
    // if (rangeSelected && showCalendar) setShowCalendar(false)
  }, [clickedOutside, selectedDate, showCalendar])

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
              onFocus={() => setShowCalendar(true)}
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
