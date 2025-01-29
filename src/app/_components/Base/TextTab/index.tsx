import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useEffect, useState, type FC } from 'react'
import styles from './style.module.css'

export type TextTabProps = {
  tabs: readonly {
    id: string
    label: string
    href?: string
  }[]
  options?: {
    key?: string
    onTabChange?: (tabId: string) => void
  }
  defaultTabIndex?: number
  variant?: 'default' | 'white'
}

export const TextTab: FC<TextTabProps> = ({
  tabs,
  defaultTabIndex = 0,
  variant = 'default',
  options,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex)

  useEffect(() => {
    setActiveTabIndex(defaultTabIndex)
  }, [defaultTabIndex])

  const handleClickTab = (index: number) => {
    setActiveTabIndex(index)
    if (
      options?.onTabChange != undefined &&
      tabs != undefined &&
      tabs[index] != undefined
    ) {
      options.onTabChange(tabs[index].id)
    }
  }

  return (
    <div className={classNames(styles.textTab)}>
      <div
        className={classNames(
          styles.tabs,
          variant === 'white' && styles._white,
        )}
      >
        <motion.div
          animate={{
            x: `${100 * activeTabIndex}%`,
          }}
          className={classNames(
            styles.bar,
            variant === 'white' && styles._white,
          )}
          initial={false}
          style={{
            width: `calc(${100 / tabs.length}% - 1px)`,
          }}
          transition={{
            duration: 0.2,
          }}
        />
        {tabs.map((tab, index) => (
          <button
            className={`${styles.tab} ${
              index === activeTabIndex ? styles.tabActive : ''
            }`}
            key={tab.id}
            onClick={() => handleClickTab(index)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
