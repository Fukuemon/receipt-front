// components/SearchBox.tsx

import classNames from 'classnames'
import React from 'react'
import styles from './style.module.css' // 適切なCSSモジュールを使用してください
import SearchIcon from '/public/icons/search.svg'

type SearchBoxProps = {
  onSearch: (value: string) => void
  placeholder?: string
  isWide?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = '検索',
  isWide = false,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className={classNames(styles.container, isWide && styles.wide)}>
      <label className={styles.search}>
        <div className={styles.icon}>
          <SearchIcon height={18} width={18} />
        </div>
        <input
          className={styles.input}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          {...props}
        />
      </label>
    </div>
  )
}
