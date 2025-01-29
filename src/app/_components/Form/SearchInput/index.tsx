// components/SearchInput.tsx

'use client'

import { type ComponentPropsWithoutRef } from 'react'

import classNames from 'classnames'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import SearchIcon from '/public/icons/search.svg'

type SearchFieldProps<T extends FieldValues> =
  ComponentPropsWithoutRef<'input'> & {
    name: FieldPath<T>
    control: Control<T>
    isWide?: boolean
    onSearch?: (value: string) => void // 追加
  }

export const SearchInput = <T extends FieldValues>({
  name,
  control,
  isWide,
  onSearch, // 追加
  ...props
}: SearchFieldProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event) // React Hook Form の onChange
    if (onSearch !== undefined) {
      onSearch(event.target.value) // カスタムの onSearch
    }
  }

  return (
    <div
      className={classNames(
        styles.container,
        isWide !== undefined && isWide && styles._wide,
      )}
    >
      <label className={styles.search}>
        <div className={styles.icon}>
          <SearchIcon height={18} width={18} />
        </div>
        <input
          className={styles.input}
          placeholder={props.placeholder ?? '検索'}
          type="text"
          {...field}
          {...props}
          onChange={handleChange} // カスタムの onChange を設定
        />
      </label>
    </div>
  )
}
