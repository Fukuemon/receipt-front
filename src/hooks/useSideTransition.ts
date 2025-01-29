'use client'

import { useEffect, useState } from 'react'

export const useSideTransition = <const T extends readonly string[]>(
  key: string,
  tabOrder: T,
  currentData: string,
  defaultValue?: string,
) => {
  type TabType = T[number]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  const [[tab, direction], setTab] = useState<[TabType | undefined, number]>([
    (defaultValue as TabType) ?? undefined,
    0,
  ])

  useEffect(() => {
    const tabValue = currentData as TabType
    if (tabValue !== undefined && tabOrder.includes(tabValue)) {
      setTab((prev) => [
        tabValue,
        tabOrder.indexOf(tabValue) -
          (prev[0] !== undefined ? tabOrder.indexOf(prev[0]) : 0),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData])

  return {
    activeTab: tab,
    direction,
    variants,
  }
}
