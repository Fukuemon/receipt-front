import type { FC } from 'react'

import styles from './style.module.css'

export type FreeTextSelectProps = {
  content: string
  placeholder: string
}

export const FreeTextSelect: FC<FreeTextSelectProps> = ({
  content,
  placeholder,
}) => {
  return (
    <div
      className={styles.freeTextSelect}
      data-empty={content === '' ? 'true' : 'false'}
    >
      <span>{content === '' ? placeholder : content}</span>
    </div>
  )
}
