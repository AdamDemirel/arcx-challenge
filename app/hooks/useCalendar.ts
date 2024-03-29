import { useClickedOutside } from './useClickedOutside'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { useSearchParams } from 'next/navigation'

// Toggle this to enable debug logs
const DEBUG = true

const INPUT_DATE_FORMAT = 'MMM do yyyy'
const PARAM_DATE_FORMAT = 'yyyy-MM-dd'

// TODO: type this as Date | null | ?range = [Date, ?Date]
type DateValue = any

const useCalendar = () => {
  const searchParams = useSearchParams()
  const fromDateParam = searchParams.get('fromDate')
  const toDateParam = searchParams.get('toDate')

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
    if (hasStartDate) return format(selectedDate?.[0], INPUT_DATE_FORMAT)
    return ''
  }, [selectedDate])


  const formattedEndDate = useMemo(() => {
    const hasEndDate = !!selectedDate?.[1]
    if (hasEndDate) return format(selectedDate?.[1], INPUT_DATE_FORMAT)
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

  useEffect(() => {
    // TODO: make sure the date string params are in the accepted format
    const newDates: Array<null | Date> = [null, null]

    if (fromDateParam) {
      newDates[0] = parse(fromDateParam, PARAM_DATE_FORMAT, new Date())
    }

    if (toDateParam) {
      newDates[1] = parse(toDateParam, PARAM_DATE_FORMAT, new Date())
    }

    setSelectedDate(newDates)
  }, [fromDateParam, toDateParam])

  // Logs all state and variables for debugging
  useEffect(() => {
    if (!DEBUG) return
    console.log('showCalendar', showCalendar)
    console.log('selectedDate', selectedDate)
    console.log('formattedStartDate', formattedStartDate)
    console.log('formattedEndDate', formattedEndDate)
    console.log('formattedInputDate', formattedInputDate)
    console.log('clickedOutside', clickedOutside)
    console.log('fromDateParam', fromDateParam)
    console.log('toDateParam', toDateParam)
  }, [formattedEndDate, formattedStartDate, selectedDate, showCalendar, formattedInputDate, clickedOutside, fromDateParam, toDateParam])

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
