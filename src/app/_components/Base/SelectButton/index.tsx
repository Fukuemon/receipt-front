'use client'

import type { ComponentPropsWithoutRef, RefObject } from 'react'

import classNames from 'classnames'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import ArrowBottomIcon from '/public/icons/arrow-bottom.svg'

export type Option = ComponentPropsWithoutRef<'option'> & {
  value: string | number
}

export type SelectButtonProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'select'> & {
    name: FieldPath<T>
    control: Control<T>
    options: Option[]
    isWide?: boolean
    inputRef?: RefObject<HTMLSelectElement>
    defaultValue?: string
    onChange?: (value: string) => void
  }

export const SelectButton = <T extends FieldValues>({
  name,
  control,
  options,
  inputRef,
  onChange,
  ...props
}: SelectButtonProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  return (
    <div className={styles.select}>
      <select
        {...field}
        {...props}
        className={classNames(styles.inner, {
          /* eslint-disable @typescript-eslint/strict-boolean-expressions */
          [styles._selected || '']: field.value,
        })}
        onChange={(e) => {
          field.onChange(e.target.value)
          onChange?.(e.target.value)
        }}
        ref={inputRef}
      >
        {options.map((optionProps) => (
          <option
            className={styles.option}
            key={optionProps.value}
            {...optionProps}
          >
            {optionProps.label}
          </option>
        ))}
      </select>
      <div className={styles.arrow}>
        <ArrowBottomIcon height={16} width={16} />
      </div>
    </div>
  )
}
