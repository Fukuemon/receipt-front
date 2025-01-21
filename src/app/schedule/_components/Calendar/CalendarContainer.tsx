import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useCalendarNavigation } from '../../hooks/useCalendarNavigation.hook'
import {
  CurrentCalendarDateAtom,
  CurrentCalendarViewAtom,
} from '../../provider/calendar'
import { CalendarToolbar } from './Toolbar'
import type { DayGridCalendarProps } from './Views/DayGrid'
import { DayGridCalendar } from './Views/DayGrid'

type Props = {
  calendarIds: string[]
}

export const Calendar: FC<Props> = ({ calendarIds }) => {
  /*
   * Toolbar
   */
  const [currentCalendarView] = useAtom(CurrentCalendarViewAtom)
  const [currentCalendarDate, setCurrentCalendarDate] = useAtom(
    CurrentCalendarDateAtom,
  )
  const { handlePrev, handleNext, handleToday } = useCalendarNavigation(
    currentCalendarView,
    currentCalendarDate ?? new Date(),
    setCurrentCalendarDate,
  )

  const { control, watch, setValue } = useForm<{ date: Date }>({
    defaultValues: {
      date: currentCalendarDate,
    },
  })

  const watchedDate = watch('date')

  // watchedDateが変更された場合、currentCalendarDateを更新
  useEffect(() => {
    if (!isEqual(watchedDate, currentCalendarDate)) {
      setCurrentCalendarDate(watchedDate) // Atomを更新
    }
  }, [watchedDate])

  // currentCalendarDateが変更された場合、formの値を更新
  useEffect(() => {
    if (!isEqual(watchedDate, currentCalendarDate)) {
      setValue('date', currentCalendarDate)
    }
  }, [currentCalendarDate])

  /*
   * DayGridCalendar
   */
  const dataClickAction = (date: { date: Date }) => {
    console.log(date)
  }
  const eventClickAction = (event: { event: { id: string } }) => {
    console.log(event)
  }
  const googleCalendarItems: DayGridCalendarProps['googleCalendarItems'] =
    calendarIds.map((calendarId) => ({
      googleCalendarId: calendarId,
    }))

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-20 px-10  py-2">
        <CalendarToolbar
          control={control}
          onNext={handleNext}
          onPrev={handlePrev}
          onToday={handleToday}
        />
      </div>
      <div className="grow overflow-hidden">
        <DayGridCalendar
          currentCalendarDate={currentCalendarDate}
          currentCalendarView={currentCalendarView}
          dataClickAction={dataClickAction}
          eventClickAction={eventClickAction}
          googleCalendarItems={googleCalendarItems}
        />
      </div>
    </div>
  )
}
