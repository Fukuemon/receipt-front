import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import { ccCategory, CcCategoryText } from '@/constants/ccCategory'

export type CcCategoryEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  isVisitSchedule: boolean
}

export const ccCategoryOptions = {
  [ccCategory.normal]: {
    label: CcCategoryText[ccCategory.normal],
  },
  [ccCategory.accompany]: {
    label: CcCategoryText[ccCategory.accompany],
  },
  [ccCategory.handover]: {
    label: CcCategoryText[ccCategory.handover],
  },
}

export const CcCategoryEdit = <T extends FieldValues>({
  control,
  name,
  isVisitSchedule,
}: CcCategoryEditProps<T>) => {
  const { field } = useController({
    control,
    name,
  })

  const filteredOptions = isVisitSchedule
    ? ccCategoryOptions
    : {
        [ccCategory.normal]: ccCategoryOptions[ccCategory.normal],
      }

  return (
    <div className={styles.ccCategoryEdit}>
      <h2 className={styles.heading}>複製カテゴリを選んでください</h2>
      <div className={styles.content}>
        {Object.entries(filteredOptions).map(([key, value]) => {
          return (
            <label className={styles.option} key={key}>
              <input
                className={styles.input}
                type="radio"
                {...field}
                checked={field.value === key}
                value={key}
              />
              <span className={styles.label}>{value.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
