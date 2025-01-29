'use client'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

import { IconButton } from '@/app/_components/Base/IconButton'

import CloseIcon from '/public/icons/close.svg'

type InterceptModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  headerContent?: ReactNode
  stickyFooter?: ReactNode
  isDirty?: boolean
  onClose?: () => void
}
export const InterceptModal = ({
  children,
  headerContent,
  stickyFooter,
  isDirty,
  onClose,
}: InterceptModalBodyProps) => {
  const handleClose = () => {
    if (isDirty === true) {
      if (!window.confirm('変更が破棄されますがよろしいですか？')) {
        return
      }
    }
    onClose?.()
  }
  return (
    <>
      (
      <div className={classNames(styles.overlay)} onClick={handleClose} />) (
      <div className={styles.modal}>
        <div className={styles.header}>
          <IconButton onClick={handleClose}>
            <CloseIcon height={28} width={28} />
          </IconButton>
          <div className={styles.content}>{headerContent}</div>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.stickyFooter}>{stickyFooter}</div>
      </div>
      )
    </>
  )
}
const Closure = ({
  onClick,
  children,
  disabled,
  isDiv = false,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  isDiv?: boolean
}) => {
  return isDiv ? (
    <div
      className={classNames({
        [styles._disabled]: disabled,
      })}
      onClick={() => {
        onClick?.()
      }}
    >
      {children}
    </div>
  ) : (
    <button
      disabled={disabled}
      onClick={() => {
        onClick?.()
      }}
      type="button"
    >
      {children}
    </button>
  )
}

InterceptModal.Closure = Closure
export default InterceptModal
