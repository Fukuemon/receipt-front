'use client'

import type {
  CalendarApi,
  DayCellContentArg,
  DayHeaderContentArg,
  EventChangeArg,
  SlotLabelContentArg,
} from '@fullcalendar/core/index.js'
import type { RefObject } from '@fullcalendar/core/preact.js'
import type { DateClickArg } from '@fullcalendar/interaction/index.js'
import type FullCalendar from '@fullcalendar/react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export default class CalendarHandler {
  calendarRef: RefObject<FullCalendar>
  calendarApi: CalendarApi | undefined
  router: AppRouterInstance
  constructor(calendarRef: RefObject<FullCalendar>, router: AppRouterInstance) {
    this.calendarRef = calendarRef
    this.router = router
    this.calendarApi = this.calendarRef.current?.getApi()
  }

  handleEventChange = (arg: EventChangeArg) => {}
  handleDateClick = (arg: DateClickArg) => {
    const start = String(arg.date).replace(/ GMT.*/, '')
    this.router.push(`/schedule/${start}`)
  }
  handleViewChange = (currentCalendarView: string) => {
    this.calendarApi?.changeView(currentCalendarView)
  }
  public headerToolbar = {
    start: 'title',
    center: '',
    end: 'today timeGridDay,timeGridWeek,dayGridMonth prev,next',
  }
  handleDayCellContent = (event: DayCellContentArg) =>
    (event.dayNumberText = event.dayNumberText.replace('日', ''))
  handleDayHeaderContent = (event: DayHeaderContentArg) =>
    (event.text = event.text.replace(/.*\//, ''))
  handleSlotLabelContent = (event: SlotLabelContentArg) =>
    (event.text = event.text.replace('時', ':00'))
}
