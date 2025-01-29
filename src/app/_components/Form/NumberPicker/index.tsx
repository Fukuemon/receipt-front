'use client'

import type { ComponentPropsWithoutRef } from 'react'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

export type NumberPickerProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    label: string
    isWide?: boolean
  }

export const NumberPicker = <T extends FieldValues>({
  name,
  control,
  label,
  isWide = false,
  ...props
}: NumberPickerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <div className={styles.numberPicker} data-wide={isWide}>
      <label
        className={styles.container}
        data-wide={isWide}
        htmlFor={field.name}
      >
        <input
          className={styles.input}
          type="number"
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(Number(e.target.value))
          }}
          value={field.value}
        />
        <span className={styles.label}>{label}</span>
      </label>
      {error != null && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}
