'use client'

import { type ComponentPropsWithoutRef } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import styles from './style.module.css'
import Calendar from '/public/icons/calendar.svg'

export type DatePickerProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    label: string
    isWide?: boolean
  }

export const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  isWide = false,
  ...props
}: DatePickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue =
      event.target.value !== '' ? new Date(event.target.value) : null
    field.onChange(dateValue)
  }

  // field.value の型チェックを改善
  const getValue = () => {
    const value = field.value as Date
    if (value !== null && typeof value === 'object' && 'getTime' in value) {
      const year = value.getFullYear()
      const month = String(value.getMonth() + 1).padStart(2, '0')
      const day = String(value.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    return ''
  }

  return (
    <div className={styles.datePicker} data-wide={isWide}>
      <label
        className={styles.container}
        data-wide={isWide}
        htmlFor={field.name}
      >
        <input
          className={styles.input}
          type="date"
          {...field}
          {...props}
          onChange={handleChange}
          value={getValue()}
        />
        <span className={styles.label}>{label}</span>
        <div className={styles.icon}>
          <Calendar height={20} width={20} />
        </div>
      </label>
      {error != null && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
