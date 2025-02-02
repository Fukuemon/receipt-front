import type { FC } from 'react'

import {
  ScheduleCategoryText,
  type ScheduleCategory,
} from '@/constants/scheduleCategory'
import styles from './style.module.css'

export type ScheduleCategorySelectProps = {
  scheduleCategory?: ScheduleCategory[]
}

export const ScheduleCategorySelect: FC<ScheduleCategorySelectProps> = ({
  scheduleCategory,
}) => {
  return (
    <div className={styles.scheduleCategorySelect}>
      {scheduleCategory !== undefined && scheduleCategory.length > 0 ? (
        scheduleCategory.map((item) => (
          <span key={item}>{ScheduleCategoryText[item]}</span>
        ))
      ) : (
        <span>通常</span>
      )}
    </div>
  )
}
