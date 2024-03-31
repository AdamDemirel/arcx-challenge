import { useClickedOutside } from './useClickedOutside'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { CalendarProps } from "react-calendar"

// See https://date-fns.org/docs/Getting-Started
const BTN_DATE_FORMAT = 'MMM do yyyy'
const PARAM_DATE_FORMAT = 'yyyy-MM-dd'

const PARAMS = {
  FROM: 'fromDate',
  TO: 'toDate'
}

type DateValue = Array<null | Date>

const useCalendar = () => {
  const searchParams = useSearchParams()
  const fromDateParam = searchParams.get(PARAMS.FROM)
  const toDateParam = searchParams.get(PARAMS.TO)

  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [selectedDates, setSelectedDates] = useState<(null|Date)[]>([null, null])
  const [isLoading, setIsLoading] = useState(!!fromDateParam || !!toDateParam)

  const calendarRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { clickedOutside } = useClickedOutside({ calendarRef, showCalendar })

  const nonNullDates = useMemo(() => selectedDates?.filter((date: any) => !!date), [selectedDates])

  // Updates state and searchParams with newly selected dates
  const handleDateChange = useCallback((newDates: any) => {
    setSelectedDates(newDates)

    const newSearchParams = new URLSearchParams(searchParams?.toString())
    const paramFormattedStartDate: string | null = newDates?.[0] ? format(newDates?.[0], PARAM_DATE_FORMAT) : null
    const paramFormattedEndDate: string | null = newDates?.[1] ? format(newDates?.[1], PARAM_DATE_FORMAT) : null

    paramFormattedStartDate ? newSearchParams.set(PARAMS.FROM, paramFormattedStartDate) : newSearchParams.delete(PARAMS.FROM)
    paramFormattedEndDate ? newSearchParams.set(PARAMS.TO, paramFormattedEndDate) : newSearchParams.delete(PARAMS.TO)

    router.push(`${pathname}?${newSearchParams?.toString()}`)
  }, [ pathname, router, searchParams])

  const toggleCalendar = useCallback(() => setShowCalendar(!showCalendar), [showCalendar])

  const btnFormattedStartDate = useMemo(() => {
    const hasStartDate = !!selectedDates?.[0]
    // @ts-ignore-next-line
    if (hasStartDate) return format(selectedDates?.[0], BTN_DATE_FORMAT)
    return ''
  }, [selectedDates])

  const btnFormattedEndDate = useMemo(() => {
    const hasEndDate = !!selectedDates?.[1]
     // @ts-ignore-next-line
    if (hasEndDate) return format(selectedDates?.[1], BTN_DATE_FORMAT)
    return ''
  }, [selectedDates])

  const formattedBtnDate = useMemo(() => {
    if (!btnFormattedStartDate && !btnFormattedEndDate) return ''
    if (btnFormattedStartDate && !btnFormattedEndDate) return btnFormattedStartDate
    if (btnFormattedStartDate && btnFormattedEndDate) {
      return `${btnFormattedStartDate} - ${btnFormattedEndDate}`
    }
  }, [btnFormattedStartDate, btnFormattedEndDate])

  const shortWeekydayFormatter = useCallback((locale: any, date: any) => format(date, 'ccccc'), [])

  const monthFormatter = useCallback((locale: any, date: any) => format(date, 'LLL'), [])

  // This mapping is needed since the calendar either accepts a single date value or an array of 2 full. breaks if array of 1 value and 1 null
  const calendarValue: CalendarProps['value'] = useMemo(() => {
    if (nonNullDates?.length === 2) return selectedDates
    if (nonNullDates?.length === 1) return selectedDates?.[0]
    return undefined
  }, [nonNullDates, selectedDates])

  // Reads the values from searchParams and syncs to btn on first load
  useEffect(() => {
    // TODO: make sure the date string params are in the accepted format
    const newDates: DateValue = [null, null]

    if (fromDateParam) {
      const parsedStartDate = parse(fromDateParam, PARAM_DATE_FORMAT, new Date())
      newDates[0] = parsedStartDate
    }

    if (toDateParam) {
      const parsedEndDate = parse(toDateParam, PARAM_DATE_FORMAT, new Date())
      newDates[1] = parsedEndDate
    }

    setSelectedDates(newDates)
    setIsLoading(false)
  }, [fromDateParam, toDateParam])

  // closes the calendar if its open, and the user clicks outside,
  useEffect(() => {
    if (showCalendar && clickedOutside) setShowCalendar(false)
  }, [clickedOutside, showCalendar])

  // Hides the calendar when the second date is selected
  useEffect(() => {
    const rangeIsSelected = nonNullDates?.length === 2
    if (rangeIsSelected) setShowCalendar(false)
  }, [selectedDates, nonNullDates])

  return {
    calendarValue,
    showCalendar,
    formattedBtnDate,
    toggleCalendar,
    handleDateChange,
    calendarRef,
    shortWeekydayFormatter,
    monthFormatter,
    isLoading,
  }
}

export { useCalendar }
