import { useClickedOutside } from './useClickedOutside'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns/format'

// Toggle this to enable debug logs
const DEBUG = true

const dateFormat = 'MMM do yyyy'

// TODO: type this as Date | null | ?range = [Date, ?Date]
type DateValue = any

const useCalendar = () => {
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


  const toggleCalendar = useCallback(() => {
    setShowCalendar(!showCalendar)
  }, [showCalendar])

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
    if (showCalendar && clickedOutside) setShowCalendar(false)
  }, [clickedOutside, selectedDate, showCalendar])

  // Hides the calendar when the second date is selected
  useEffect(() => {
    const nonNullDates = selectedDate?.filter((date: any) => !!date)
    const rangeIsSelected = nonNullDates?.length === 2
    if (rangeIsSelected) setShowCalendar(false)
  }, [selectedDate])

  return {
    showCalendar,
    formattedInputDate,
    toggleCalendar,
    handleDateChange,
    calendarRef,
  }
}

export { useCalendar }
