export const CalendarView = {
  timeGridDay: 'timeGridDay',
  timeGridWeek: 'timeGridWeek',
  dayGridMonth: 'dayGridMonth',
} as const

export type CalendarView = (typeof CalendarView)[keyof typeof CalendarView]

export const CalendarViewText: Record<CalendarView, string> = {
  [CalendarView.timeGridDay]: '日',
  [CalendarView.timeGridWeek]: '週',
  [CalendarView.dayGridMonth]: '月',
} as const

export const CALENDAR_VIEW_OPTIONS: { value: CalendarView; label: string }[] = [
  { value: CalendarView.timeGridDay, label: CalendarViewText.timeGridDay },
  { value: CalendarView.timeGridWeek, label: CalendarViewText.timeGridWeek },
  { value: CalendarView.dayGridMonth, label: CalendarViewText.dayGridMonth },
]
