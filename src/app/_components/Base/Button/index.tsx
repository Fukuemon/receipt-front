'use client'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import type { UrlObject } from 'url'

import classNames from 'classnames'
import NextLink from 'next/link'

import styles from './style.module.css'

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: 'S' | 'M' | 'L'
  children: ReactNode
  isAnchor?: boolean
  isWide?: boolean
  isDiv?: boolean
  isLoading?: boolean
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
type DivButtonProps = BaseProps & ComponentPropsWithoutRef<'div'>

const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.circle}></div>
  </div>
)

export type ButtonProps = NativeButtonProps | AnchorButtonProps

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'M',
  isAnchor = false,
  isWide,
  isDiv,
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const className = classNames(styles.button, {
    [styles._primary!]: variant === 'primary',
    [styles._secondary!]: variant === 'secondary',
    [styles._destructive!]: variant === 'destructive',
    [styles._large!]: size === 'L',
    [styles._small!]: size === 'S',
    [styles._medium!]: size === 'M',
    [styles._wide!]: isWide,
  })
  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading === true) {
      e.preventDefault()
    } else if (isLoading === false) {
      ;(props.onClick as NativeButtonProps['onClick'])?.(e)
    }
  }

  return isAnchor ? (
    <NextLink
      className={className}
      disabled={disabled}
      {...(props as AnchorButtonProps)}
    >
      <div className={styles.content}>{children}</div>
    </NextLink>
  ) : isDiv != null ? (
    <div className={className} {...(props as DivButtonProps)}>
      <div className={styles.content}>
        {isLoading != null && isLoading ? <Loading /> : children}
      </div>
    </div>
  ) : (
    <button
      className={classNames(className)}
      disabled={disabled}
      {...(props as NativeButtonProps)}
      onClick={buttonClickHandler}
    >
      <div className={styles.content}>
        {isLoading != null ? isLoading ? <Loading /> : children : children}
      </div>
    </button>
  )
}
