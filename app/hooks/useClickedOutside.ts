import { useEffect, useCallback, useState } from "react"

interface useClickedOutsideArgs {
  calendarRef: React.RefObject<HTMLDivElement>
  showCalendar: boolean
}

// This hook checks if you've clicked outside of the passed ref
// Needed since react-calendar doesn't handle this function
const useClickedOutside = ({ calendarRef, showCalendar }: useClickedOutsideArgs) => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)

  // Checks if clicked outside of ref element, if exists
  const handleClickOutside = useCallback((event: Event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setClickedOutside(true)
    }
  }, [calendarRef])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [calendarRef, handleClickOutside])

  // Resets clicked state if calendar closes
  useEffect(() => {
    if (!showCalendar) setClickedOutside(false)
  }, [showCalendar])

  return { clickedOutside }
}

export { useClickedOutside }
