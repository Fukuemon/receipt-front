import { DatePicker } from '@/app/_components/Form/DatePicker'
import { NumberPicker } from '@/app/_components/Form/NumberPicker'
import { TimePicker } from '@/app/_components/Form/TimePicker'
import { ServiceCodeEdit } from '@/app/schedule/_components/Calendar/ScheduleForm/ContentPanel/VisitInfo/ServiceCode'
import type { ServiceCode } from '@/constants/serviceCode'
import { ServiceCodeDuration } from '@/constants/serviceCode'
import type { Schedule, ScheduleCreate } from '@/schema/schedule'
import { useEffect } from 'react'
import {
  useWatch,
  type Control,
  type FieldPath,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from 'react-hook-form'
import styles from './style.module.css'

export type ScheduleDatePanelProps = {
  control: Control<ScheduleCreate>
  dateName: FieldPath<ScheduleCreate>
  startTimeName: FieldPath<ScheduleCreate>
  endTimeName: FieldPath<ScheduleCreate>
  serviceTimeName: FieldPath<ScheduleCreate>
  setValue: UseFormSetValue<ScheduleCreate>
  serviceCodeName: FieldPath<ScheduleCreate>
  isVisitSchedule: boolean
}

export const ScheduleDatePanel = ({
  control,
  setValue,
  dateName,
  startTimeName,
  endTimeName,
  serviceTimeName,
  serviceCodeName,
  isVisitSchedule,
}: ScheduleDatePanelProps) => {
  const date = useWatch({ control, name: dateName })
  const startTime = useWatch({ control, name: startTimeName }) as
    | string
    | undefined
  const endTime = useWatch({ control, name: endTimeName }) as string | undefined
  const serviceTime = useWatch({ control, name: serviceTimeName }) as
    | number
    | undefined
  const serviceCode = useWatch({ control, name: serviceCodeName }) as
    | ServiceCode
    | undefined

  useEffect(() => {
    // serviceCode変更時
    if (
      serviceCode !== undefined &&
      date !== undefined &&
      startTime !== undefined &&
      endTime !== undefined &&
      serviceTime !== undefined
    ) {
      const duration = ServiceCodeDuration[serviceCode].max
      setValue(
        serviceTimeName,
        duration as PathValue<Schedule, Path<Schedule>>,
        {
          shouldValidate: true,
        },
      )

      const [startHours, startMinutes] = startTime.split(':').map(Number) as [
        number,
        number,
      ]

      const startDate = new Date(date)
      startDate.setHours(startHours, startMinutes, 0, 0)

      const newEndDate = new Date(startDate.getTime() + serviceTime * 60000)
      const newEndTime = `${newEndDate.getHours().toString().padStart(2, '0')}:${newEndDate.getMinutes().toString().padStart(2, '0')}`

      setValue(endTimeName, newEndTime as PathValue<Schedule, Path<Schedule>>, {
        shouldValidate: true,
      })
    }
  }, [
    serviceCode,
    setValue,
    serviceTimeName,
    date,
    startTime,
    endTime,
    serviceTime,
  ])

  useEffect(() => {
    // startTime変更時
    if (
      date !== undefined &&
      startTime !== undefined &&
      serviceTime !== undefined
    ) {
      if (isVisitSchedule) {
        const timeParts = startTime.split(':').map(Number)
        if (timeParts.length === 2) {
          const [startHours, startMinutes] = timeParts as [number, number]

          const startDate = new Date(date)
          startDate.setHours(startHours, startMinutes, 0, 0)

          const serviceTimeValue = serviceTime ?? 0
          const newEndDate = new Date(
            startDate.getTime() + serviceTimeValue * 60000,
          )
          const newEndTime = `${newEndDate.getHours().toString().padStart(2, '0')}:${newEndDate.getMinutes().toString().padStart(2, '0')}`

          setValue(
            endTimeName,
            newEndTime as PathValue<Schedule, Path<Schedule>>,
            { shouldValidate: true },
          )
        }
      } else {
        setValue(
          endTimeName,
          startTime as PathValue<Schedule, Path<Schedule>>,
          { shouldValidate: true },
        )
      }
    }
  }, [date, startTime, serviceTime, setValue, endTimeName, isVisitSchedule])

  useEffect(() => {
    // serviceTime変更時
    if (serviceCode !== undefined && serviceTime !== undefined) {
      const { min, max } = ServiceCodeDuration[serviceCode]
      if (serviceTime < min) {
        setValue(serviceTimeName, min as PathValue<Schedule, Path<Schedule>>, {
          shouldValidate: true,
        })
      } else if (serviceTime > max) {
        setValue(serviceTimeName, max as PathValue<Schedule, Path<Schedule>>, {
          shouldValidate: true,
        })
      }
    }
  }, [serviceTime, setValue, serviceTimeName])

  return (
    <div className={styles.scheduleDateEdit}>
      <h1 className={styles.title}>
        {isVisitSchedule ? '訪問日時' : '予定日時'}
      </h1>
      <div className={styles.inputs}>
        <div className={styles.row}>
          <DatePicker
            control={control}
            isWide
            label={isVisitSchedule ? '訪問日' : '日付'}
            name={dateName}
          />
        </div>
        <div className={styles.row}>
          <TimePicker
            control={control}
            isWide
            label="開始時間"
            name={startTimeName}
          />
          {isVisitSchedule && (
            <NumberPicker
              control={control}
              isWide
              label="提供時間（分）"
              min={0}
              name={serviceTimeName}
            />
          )}
        </div>
        <div className={styles.row}>
          <TimePicker
            control={control}
            disabled={isVisitSchedule}
            isWide
            label="終了時間"
            name={endTimeName}
          />
        </div>
      </div>
      {isVisitSchedule && (
        <div className={styles.serviceCode}>
          <ServiceCodeEdit control={control} name={serviceCodeName} />
        </div>
      )}
    </div>
  )
}
