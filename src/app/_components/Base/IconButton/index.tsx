'use client'

import NextLink from 'next/link'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import type { UrlObject } from 'url'
import styles from './style.module.css'

type BaseProps = {
  children: ReactNode
  isAnchor?: boolean
}

type NativeButtonProps = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: never
  }

type AnchorButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string | UrlObject
    disabled?: boolean
  }

export type IconButtonProps = NativeButtonProps | AnchorButtonProps

export const IconButton: FC<IconButtonProps> = ({
  isAnchor = false,
  disabled,
  children,
  ...props
}) => {
  return isAnchor ? (
    <NextLink className={styles.iconButton} {...(props as AnchorButtonProps)}>
      <div className={styles.content}>{children}</div>
    </NextLink>
  ) : (
    <button
      className={styles.iconButton}
      disabled={disabled}
      type="button"
      {...(props as NativeButtonProps)}
    >
      {children}
    </button>
  )
}
