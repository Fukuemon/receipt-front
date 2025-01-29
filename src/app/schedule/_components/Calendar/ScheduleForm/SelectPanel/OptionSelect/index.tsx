import type { FC } from 'react'

import styles from './style.module.css'

export type OptionSelectProps = {
  content: string
}

export const OptionSelect: FC<OptionSelectProps> = ({ content }) => {
  return (
    <div
      className={styles.optionSelect}
      data-empty={content === '' ? 'true' : 'false'}
    >
      <span>{content}</span>
    </div>
  )
}
