import { useClickedOutside } from './useClickedOutside'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// See https://date-fns.org/docs/Getting-Started
const BTN_DATE_FORMAT = 'MMM do yyyy'
const PARAM_DATE_FORMAT = 'yyyy-MM-dd'

const PARAMS = {
  FROM: 'fromDate',
  TO: 'toDate'
} as const

type DateValuePiece = Date | null;
type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

const useCalendar = () => {
  const searchParams = useSearchParams()
  const fromDateParam = searchParams.get(PARAMS.FROM)
  const toDateParam = searchParams.get(PARAMS.TO)

  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [selectedDates, setSelectedDates] = useState<DateValue>([null, null])
  const [isLoading, setIsLoading] = useState(!!fromDateParam || !!toDateParam)

  const calendarRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const { clickedOutside } = useClickedOutside({ calendarRef, showCalendar })

  const nonNullDates = useMemo(() => Array.isArray(selectedDates) ? selectedDates?.filter((date: any) => !!date) : [], [selectedDates])

  const btnDateFormatter = useCallback((index: 0 | 1) => {
    const hasDateValue = (Array.isArray(selectedDates) && !!selectedDates?.[index]) || false
    if (hasDateValue && Array.isArray(selectedDates)) {
      return format(selectedDates?.[index] as Date, BTN_DATE_FORMAT)
    }
    return ''
  }, [selectedDates])

  const paramDateFormatter = useCallback((newDates: DateValue, index: 0 | 1) =>
    (Array.isArray(newDates) && newDates?.[index]) ? format(newDates?.[index] as Date, PARAM_DATE_FORMAT) : null
  , [])

  // Updates state and searchParams with newly selected dates
  const handleDateChange = useCallback((newDates: DateValue) => {
    setSelectedDates(newDates)

    const newSearchParams = new URLSearchParams(searchParams?.toString())
    const paramFormattedStartDate = paramDateFormatter(newDates, 0)
    const paramFormattedEndDate = paramDateFormatter(newDates, 1)

    paramFormattedStartDate ? newSearchParams.set(PARAMS.FROM, paramFormattedStartDate) : newSearchParams.delete(PARAMS.FROM)
    paramFormattedEndDate ? newSearchParams.set(PARAMS.TO, paramFormattedEndDate) : newSearchParams.delete(PARAMS.TO)

    router.push(`${pathname}?${newSearchParams?.toString()}`)
  }, [pathname, router, searchParams, paramDateFormatter])

  const toggleCalendar = useCallback((): void => setShowCalendar(!showCalendar), [showCalendar])

  const btnFormattedStartDate: string = useMemo(() => btnDateFormatter(0), [btnDateFormatter])

  const btnFormattedEndDate: string = useMemo(() => btnDateFormatter(1), [btnDateFormatter])

  const formattedBtnDate: string = useMemo(() => {
    if (btnFormattedStartDate && btnFormattedEndDate) {
      return `${btnFormattedStartDate} - ${btnFormattedEndDate}`
    }
    if (btnFormattedStartDate && !btnFormattedEndDate) return btnFormattedStartDate
    return ''
  }, [btnFormattedStartDate, btnFormattedEndDate])

  const shortWeekydayFormatter = useCallback((locale: any, date: Date) => format(date, 'ccccc'), [])

  const monthFormatter = useCallback((locale: any, date: Date) => format(date, 'LLL'), [])

  // This mapping is needed since the calendar either accepts a single date value or an array of 2 full. breaks if array of 1 value and 1 null
  const calendarValue: DateValue = useMemo(() => {
    if (!Array.isArray(selectedDates)) return null
    if (nonNullDates?.length === 2) return selectedDates
    if (nonNullDates?.length === 1) return selectedDates?.[0]
    return null
  }, [nonNullDates, selectedDates])

  // Reads the values from searchParams and syncs to btn on first load
  useEffect(() => {
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

  // Closes the calendar if its open, and the user clicks outside,
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
