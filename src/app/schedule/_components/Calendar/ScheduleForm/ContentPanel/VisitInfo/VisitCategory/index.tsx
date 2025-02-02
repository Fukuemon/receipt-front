import type { FC } from 'react'

import type { Control } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import type { ScheduleCategory } from '@/constants/scheduleCategory'
import {
  scheduleCategoryConstant,
  ScheduleCategoryText,
} from '@/constants/scheduleCategory'
import type { ScheduleCreate } from '@/schema/schedule'
import { VisitScheduleKey } from '@/schema/schedule'

export type VisitCategoryPanelProps = {
  control: Control<ScheduleCreate>
}

export const ScheduleCategoryOptions = [
  {
    label: ScheduleCategoryText.night,
    value: scheduleCategoryConstant.night,
  },
  {
    label: ScheduleCategoryText.emergency,
    value: scheduleCategoryConstant.emergency,
  },
  {
    label: ScheduleCategoryText.hospitalization,
    value: scheduleCategoryConstant.hospitalization,
  },
]

export const VisitCategoryPanel: FC<VisitCategoryPanelProps> = ({
  control,
}) => {
  const { field } = useController({
    control,
    name: VisitScheduleKey.ScheduleCategory,
  })

  return (
    <div className={styles.scheduleCategoryCreate}>
      <h2 className={styles.heading}>訪問の種類を選んでください</h2>
      <div className={styles.content}>
        {ScheduleCategoryOptions.map((option) => (
          <label className={styles.radioCards} key={option.value}>
            <input
              className={styles.radio}
              type="checkbox"
              {...field}
              checked={field.value?.includes(option.value)}
              onChange={(e) => {
                const valueCopy = [...(field.value ?? [])]

                if (e.target.checked) {
                  valueCopy.push(option.value as ScheduleCategory)
                } else {
                  valueCopy.splice(
                    valueCopy.indexOf(option.value as ScheduleCategory),
                    1,
                  )
                }
                field.onChange(valueCopy) // 更新
              }}
              value={option.value}
            />
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
