import { useEffect, useCallback, useState } from "react"

// This hook checks if you've clicked outside of the passed ref
// Needed since react-calendar doesn't handle this function
const useClickedOutside = ({ calendarRef, showCalendar }: any) => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false)

  // Checks if clicked outside of ref element, if exists
  const handleClickOutside = useCallback((event: any) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setClickedOutside(true)
    }
  }, [calendarRef])

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      // Unbind the event listener on clean up
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
