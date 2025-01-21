import { CalendarView } from '@/constants/calendarView'
import { useCallback } from 'react'

export const useCalendarNavigation = (
  currentCalendarView: string,
  currentCalendarDate: Date,
  setCurrentCalendarDate: (date: Date) => void,
) => {
  const updateDate = useCallback(
    (days: number, months: number = 0) => {
      const newDate = new Date(currentCalendarDate)
      newDate.setDate(newDate.getDate() + days)
      newDate.setMonth(newDate.getMonth() + months)
      setCurrentCalendarDate(newDate)
    },
    [currentCalendarDate, setCurrentCalendarDate],
  )

  const handlePrev = useCallback(() => {
    switch (currentCalendarView) {
      case CalendarView.timeGridDay:
        updateDate(-1)
        break
      case CalendarView.timeGridWeek:
        updateDate(-7)
        break
      case CalendarView.dayGridMonth:
        updateDate(0, -1)
        break
    }
  }, [currentCalendarView, updateDate])

  const handleNext = useCallback(() => {
    switch (currentCalendarView) {
      case CalendarView.timeGridDay:
        updateDate(1)
        break
      case CalendarView.timeGridWeek:
        updateDate(7)
        break
      case CalendarView.dayGridMonth:
        updateDate(0, 1)
        break
    }
  }, [currentCalendarView, updateDate])

  const handleToday = useCallback(() => {
    setCurrentCalendarDate(new Date())
  }, [setCurrentCalendarDate])

  return { handlePrev, handleNext, handleToday }
}
