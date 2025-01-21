import type { EventSourceInput, PluginDef } from '@fullcalendar/core/index.js'
import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import type { DateClickArg } from '@fullcalendar/interaction'
import interactionPlugin from '@fullcalendar/interaction'
import momentTimezonePlugin from '@fullcalendar/moment-timezone'
import FullCalendar from '@fullcalendar/react'
import type { FC } from 'react'
import { StyleWrapper } from './styled'

type CalendarPresenterProps = {
  calendarRef?: React.RefObject<FullCalendar>
  currentCalendarView: string
  events?: EventSourceInput
  dateClickAction?: (arg: DateClickArg) => void
  eventClickAction?: (arg: { event: { id: string } }) => void
  otherPlugins?: PluginDef[]
  googleCalendarInput?: {
    googleCalendarApiKey: string
    calendars: GoogleCalendarProps[]
  }
}

export type GoogleCalendarProps = {
  googleCalendarId: string
  className?: string
  color?: string
  textColor?: string
}

export const DayGridPresenter: FC<CalendarPresenterProps> = ({
  calendarRef,
  events,
  currentCalendarView,
  dateClickAction,
  eventClickAction,
  otherPlugins,
  googleCalendarInput,
}) => {
  const plugins: PluginDef[] = [
    interactionPlugin,
    dayGridPlugin,
    momentTimezonePlugin,
  ]
  if (otherPlugins !== undefined) {
    plugins.push(...otherPlugins)
  }

  // googleCalendarIdsがundefinedの場合は空の配列を代入
  const eventSources: EventSourceInput[] = []
  if (googleCalendarInput !== undefined) {
    plugins.push(googleCalendarPlugin)
    googleCalendarInput.calendars.forEach((calendar) => {
      eventSources.push({
        googleCalendarId: calendar.googleCalendarId,
        className: calendar.className,
        color: calendar.color,
        textColor: calendar.textColor,
      })
    })
    console.log(eventSources)
  }

  return (
    <div className="h-full">
      <StyleWrapper>
        <FullCalendar
          dateClick={dateClickAction}
          dayCellClassNames={function () {
            // ホバーエフェクトを追加
            return 'hover:bg-gray-100'
          }}
          dayCellContent={function (arg) {
            // 日付の表示を変更
            const day = arg.date.getDate()
            return day.toString()
          }}
          eventClick={eventClickAction}
          eventSources={eventSources}
          events={events}
          googleCalendarApiKey={googleCalendarInput?.googleCalendarApiKey}
          height="auto"
          initialView={currentCalendarView}
          locale={jaLocale}
          nowIndicator // 現在時刻を表示
          plugins={plugins}
          ref={calendarRef}
          timeZone="Asia/Tokyo"
          viewHeight="auto"
        />
      </StyleWrapper>
    </div>
  )
}
