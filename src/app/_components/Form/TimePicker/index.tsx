'use client'

import type { ComponentPropsWithoutRef } from 'react'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import TimerIcon from '/public/icons/timer.svg'

export type TimePickerProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    label: string
    isWide?: boolean
  }

export const TimePicker = <T extends FieldValues>({
  name,
  control,
  label,
  isWide = false,
  ...props
}: TimePickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className={styles.timePicker} data-wide={isWide}>
      <label
        className={styles.container}
        data-wide={isWide}
        htmlFor={field.name}
      >
        <input
          className={styles.input}
          type="time"
          {...field}
          {...props}
          value={field.value}
        />
        <span className={styles.label}>{label}</span>
        <div className={styles.icon}>
          <TimerIcon height={20} width={20} />
        </div>
      </label>
      {error != null && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
