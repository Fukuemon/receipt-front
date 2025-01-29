import type { FC } from 'react'

import styles from './style.module.css'

export type UserSelectProps = {
  content: string
}

export const UserSelect: FC<UserSelectProps> = ({ content }) => {
  return (
    <div
      className={styles.userSelect}
      data-empty={content === '' ? 'true' : 'false'}
    >
      <span>{content}</span>
    </div>
  )
}
