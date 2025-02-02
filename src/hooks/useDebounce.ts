// hooks/useDebounce.ts

import { useCallback, useEffect, useRef } from 'react'

/**
 * useDebounce フック
 * 指定された遅延時間後に関数を実行するデバウンスされた関数を返します。
 *
 * @param func - デバウンスする関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function useDebounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | undefined>()

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        func(...args)
      }, delay)
    },
    [func, delay],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFunction
}
