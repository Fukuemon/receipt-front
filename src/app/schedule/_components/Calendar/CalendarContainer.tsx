// ここから先はカレンダーやモーダル呼び出し周り
import { Loading } from '@/app/_components/Base/Loading'
import Modal from '@/app/_components/Base/Modal'
import type { ScheduleCategory } from '@/constants/scheduleCategory'
import type { GASResponse } from '@/hooks/api/client'
import { useStaffList } from '@/hooks/api/staff'
import { type ScheduleCreate } from '@/schema/schedule'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCalendarNavigation } from '../../hooks/useCalendarNavigation.hook'
import {
  CurrentCalendarDateAtom,
  CurrentCalendarViewAtom,
} from '../../provider/calendar'
import { ScheduleFormContainer } from './ScheduleForm/ScheduleFormContainer'
import { CalendarToolbar } from './Toolbar'
import type { DayGridCalendarProps } from './Views/DayGrid'
import { DayGridCalendar } from './Views/DayGrid'

function toDateYmdOnly(date: Date): Date {
  // new Date(year, monthIndex, day) → 時間は 00:00:00 で作成される
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function translateCategoryToJapanese(cat: string): string {
  switch (cat) {
    case 'night':
      return '夜勤'
    case 'emergency':
      return '緊急'
    case 'hospitalization':
      return '入院'
    default:
      return cat
  }
}

function formatScheduleData(data: ScheduleCreate) {
  const newData = { ...data }

  if (newData.scheduleDate instanceof Date) {
    newData.scheduleDate = toDateYmdOnly(newData.scheduleDate)
  }

  if (
    'scheduleCategory' in newData &&
    Array.isArray(newData.scheduleCategory)
  ) {
    const originalCategories = newData.scheduleCategory as string[]

    const mapped = originalCategories.map((cat) =>
      translateCategoryToJapanese(cat),
    ) as ScheduleCategory[]

    newData.scheduleCategory = mapped
  }

  return newData
}

export const Calendar = () => {
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
   * Modal State
   */
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const openModal = (date: Date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  /*
   * DayGridCalendar
   */
  const [refreshKey, setRefreshKey] = useState(0)
  const dataClickAction = (date: { date: Date }) => {
    console.log('Date clicked:', date)
    openModal(date.date) // クリックされた日付を渡してモーダルを開く
  }

  const eventClickAction = (event: { event: { id: string } }) => {
    console.log('event', event)
  }

  const { data: staffs, error, isLoading } = useStaffList('')

  const calendarIds: string[] = staffs?.map((staff) => staff.id) ?? []

  const googleCalendarItems: DayGridCalendarProps['googleCalendarItems'] =
    calendarIds.map((calendarId, index) => ({
      googleCalendarId: calendarId,
      // indexに基づいて色を生成
      color: `hsl(${(index * 360) / calendarIds.length}, 100%, 50%)`,
    }))

  /**
   * スケジュール登録
   */
  const onSubmit = async (data: ScheduleCreate) => {
    const formatted = formatScheduleData(data)
    const url = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_URL
    if (url == null) {
      console.error('API URL が定義されていません')
      return
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formatted),
      })

      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`,
        )
      }

      // ここでレスポンスを JSON としてパース
      const resData = (await response.json()) as GASResponse

      if (resData.success === true) {
        // カレンダー再描画
        setRefreshKey((prev) => prev + 1)
        closeModal()
      } else {
        console.error('Failed to submit schedule:', resData.message)
      }
    } catch (error) {
      console.error('Failed to submit', error)
      closeModal()
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex h-20 px-10 py-2">
          <CalendarToolbar
            control={control}
            onNext={handleNext}
            onPrev={handlePrev}
            onToday={handleToday}
          />
        </div>
        {/* カレンダー */}
        <div className="grow overflow-hidden">
          {isLoading ? (
            <Loading />
          ) : (
            <DayGridCalendar
              currentCalendarDate={currentCalendarDate}
              currentCalendarView={currentCalendarView}
              dataClickAction={dataClickAction}
              eventClickAction={eventClickAction}
              googleCalendarItems={googleCalendarItems}
              key={refreshKey}
            />
          )}
        </div>
      </div>
      {/* isModalOpen のときにだけモーダルを表示 */}
      <Modal className="modal" isOpen={isModalOpen} onCloseRequest={closeModal}>
        <ScheduleFormContainer
          onSubmit={onSubmit}
          startDate={selectedDate ?? new Date()}
        />
      </Modal>
    </>
  )
}
