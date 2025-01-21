import CalendarHandler from '@/app/schedule/libs/calendarHandler'
import type FullCalendar from '@fullcalendar/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, type FC } from 'react'
import type { GoogleCalendarProps } from './DayGridPresenter'
import { DayGridPresenter } from './DayGridPresenter'

export type DayGridCalendarProps = {
  currentCalendarDate: Date
  currentCalendarView: string
  googleCalendarItems: GoogleCalendarProps[]
  dataClickAction: (arg: { date: Date }) => void
  eventClickAction: (arg: { event: { id: string } }) => void
}

export const DayGridCalendar: FC<DayGridCalendarProps> = ({
  currentCalendarDate,
  currentCalendarView,
  googleCalendarItems,
  dataClickAction,
  eventClickAction,
}) => {
  /**
   * FullCalendar
   */
  const router = useRouter()
  const calendarRef = useRef<FullCalendar>(null)
  const calendarHandler = new CalendarHandler(calendarRef, router)

  useEffect(() => {
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi()
      if (currentCalendarDate !== null) {
        calendarApi.gotoDate(currentCalendarDate)
      }
    }
  }, [currentCalendarDate])

  useEffect(() => {
    calendarHandler.handleViewChange(currentCalendarView)
  }, [currentCalendarView])

  /**
   * GoogleCalendar
   */
  const googleCalendarApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  if (googleCalendarApiKey === undefined) {
    throw new Error('Google Calendar API Keyが設定されていません')
  }
  const googleCalendarInput = {
    googleCalendarApiKey,
    calendars: googleCalendarItems,
  }

  return (
    <DayGridPresenter
      calendarRef={calendarRef}
      currentCalendarView={currentCalendarView}
      dateClickAction={dataClickAction}
      eventClickAction={eventClickAction}
      googleCalendarInput={googleCalendarInput}
    />
  )
}
