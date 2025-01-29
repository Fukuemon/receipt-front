'use client'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './style.module.css'

import { Button } from '../Button'
import CloseIcon from '/public/icons/close.svg'

type ModalContextType = {
  onCloseRequest?: () => void
}

const ModalContext = createContext<ModalContextType>({
  onCloseRequest: undefined,
})

const Modal = ({
  children,
  className,
  isOpen,
  onCloseRequest,
  onOpen,
}: ComponentPropsWithoutRef<'div'> & {
  isOpen: boolean
  onOpen?: () => void
  onCloseRequest?: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isOpen && onOpen != null) {
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <ModalContext.Provider value={{ onCloseRequest }}>
      {isOpen && (
        <div className={className} ref={ref}>
          {children}
        </div>
      )}
    </ModalContext.Provider>
  )
}

const Closure = ({
  onClick,
  children,
  disabled,
}: {
  children: ReactNode
  onClick?: () => void | Promise<void>
  disabled?: boolean
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        if (disabled == true) return
        if (onClick != null) {
          const result = onClick()
          if (result instanceof Promise) {
            result.catch((error) => {
              console.error('Error in onClick handler:', error)
            })
          }
        }
      }}
      type="button"
    >
      {children}
    </Button>
  )
}

type ModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  title?: string
  headerContent?: ReactNode
  stickyFooter?: ReactNode
  isDirty?: boolean
}
const Body = ({
  children,
  title,
  headerContent,
  stickyFooter,
  isDirty,
}: ModalBodyProps) => {
  const { onCloseRequest } = useContext(ModalContext)

  const handleClose = () => {
    if (
      isDirty !== null &&
      !window.confirm('変更が破棄されますがよろしいですか？')
    ) {
      return
    }
    onCloseRequest?.()
  }

  return (
    <AnimatePresence mode="wait">
      <>
        <motion.div
          animate={{ opacity: 1 }}
          className={classNames(styles.overlay)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key="overlay"
          onClick={handleClose}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          animate={{ opacity: 1, y: 'calc(-50% + 0px)' }}
          className={styles.modal}
          exit={{
            opacity: 0,
            y: window.matchMedia('(min-width: 720px)').matches
              ? 'calc(-50% + 20px)'
              : 'calc(-50% + 50px)',
          }}
          initial={{
            opacity: 0,
            y: window.matchMedia('(min-width: 720px)').matches
              ? 'calc(-50% + 20px)'
              : 'calc(-50% + 100%)',
            x: '-50%',
          }}
          key="modal"
          transition={{ duration: 0.2 }}
        >
          <div className={styles.header}>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              type="button"
            >
              <CloseIcon height={24} width={24} />
            </button>
            <div className={styles.content}>{headerContent}</div>
            {title !== null && <h3 className={styles.heading}>{title}</h3>}
          </div>
          {children}
          {stickyFooter != null && (
            <div className={styles.stickyFooter}>{stickyFooter}</div>
          )}
        </motion.div>
      </>
    </AnimatePresence>
  )
}

Modal.Body = Body
Modal.Closure = Closure

export default Modal
