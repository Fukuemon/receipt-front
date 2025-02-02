import type { ReactNode } from 'react'
import { useCallback, useMemo } from 'react'

import { usePathname, useRouter } from 'next/navigation'

export type useTabProps = {
  content: string
  tabs: readonly {
    id: string
    label: string | ReactNode
    href?: string
  }[]
  options?: {
    key?: string
  }
  defaultTabIndex?: number
  disable?: boolean
}

export const useTab = ({
  content,
  tabs,
  options,
  defaultTabIndex = 0,
}: useTabProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const tabKey = useMemo(() => options?.key ?? 'tab', [options])

  const activeTabIndex = useMemo(() => {
    const tab = content

    if (tab === undefined) {
      const hrefIndex = tabs.findIndex((t) => t.href === pathname)

      if (hrefIndex !== -1) {
        return hrefIndex
      }
      // hrefが設定されている場合はnullを返す
      if (tabs.some((t) => t.href)) {
        return null
      }

      return defaultTabIndex ?? 0
    }

    const tabIndex = tabs.findIndex((t) => t.id === tab)

    return tabIndex === -1 ? 0 : tabIndex
  }, [content, tabKey, tabs, defaultTabIndex, pathname])

  const handleClickTab = useCallback(
    (index: number) => {
      const tab = tabs[index]
      if (tab === undefined) {
        console.error('tab not found')
        return
      }

      if (tab.href !== undefined) {
        router.push(tab.href, {
          scroll: false,
        })
        return
      }
    },
    [content, tabKey, tabs, router],
  )

  return {
    tabs,
    activeTabIndex,
    handleClickTab,
  }
}
