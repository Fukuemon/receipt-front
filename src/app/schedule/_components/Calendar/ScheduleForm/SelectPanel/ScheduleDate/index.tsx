import type { FC } from 'react'

import { ServiceCodeText, type ServiceCode } from '@/constants/serviceCode'
import styles from './style.module.css'

export type ScheduleDateSelectProps = {
  scheduleDate: Date
  startTime: string
  endTime: string
  serviceTime: number
  serviceCode: ServiceCode
  isVisitSchedule: boolean
}

export const ScheduleDateSelect: FC<ScheduleDateSelectProps> = ({
  scheduleDate,
  startTime,
  endTime,
  serviceTime,
  serviceCode,
  isVisitSchedule,
}) => {
  const year = scheduleDate.getFullYear()
  const month = String(scheduleDate.getMonth() + 1).padStart(2, '0')
  const day = String(scheduleDate.getDate()).padStart(2, '0')
  return (
    <div className={styles.dateSelect}>
      <p>{`${year}-${month}-${day}`}</p>

      <div>
        <p className={styles.title}>開始時間</p>
        <p>{startTime}</p>
      </div>
      <div>
        <p className={styles.title}>終了時間</p>
        <p>{endTime}</p>
      </div>
      {isVisitSchedule && (
        <div>
          <p className={styles.title}>提供時間</p>
          <p>{serviceTime}分</p>
        </div>
      )}
      {isVisitSchedule && (
        <div>
          <p className={styles.title}>サービスコード</p>
          <p>{ServiceCodeText[serviceCode]}</p>
        </div>
      )}
    </div>
  )
}
