import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import styles from './style.module.css'

type HeaderProps = {
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  center?: ReactNode
  right?: ReactNode
  left?: ReactNode
  menubar?: ReactNode
  isMenubarOpen?: boolean
  children: ReactNode
}

export const Header: FC<HeaderProps> = ({
  rightIcon,
  leftIcon,
  center,
  right,
  left,
  menubar,
  isMenubarOpen,
  children,
}) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <div className={styles.leftIcon}>{leftIcon}</div>
        <div className={styles.left}>{left}</div>
        <div className={styles.center}>{center}</div>
        <div className={styles.right}>{right}</div>
        <div className={styles.rightIcon}>{rightIcon}</div>
      </div>
      <div
        className={classNames(styles.content, {
          [styles._isMenubarOpen as string]: isMenubarOpen,
        })}
      >
        <div>{menubar}</div>
        <div>{children}</div>
      </div>
    </div>
  )
}
