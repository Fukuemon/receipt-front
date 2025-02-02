import type { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { FC, ReactNode } from 'react'
import styles from './style.module.css'

export type ButtonContentProps = {
  id: ScheduleKey | VisitScheduleKey
  label: string
  content: ReactNode
}

export type SelectPanelProps = {
  scheduleMap: ButtonContentProps[]
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  currentId: ScheduleKey | VisitScheduleKey | undefined
}

export const SelectPanel: FC<SelectPanelProps> = ({
  scheduleMap,
  setCurrentId,
  currentId,
}) => {
  return (
    <div className={styles.selectPanel}>
      <div className={styles.buttons}>
        {scheduleMap.map((button) => (
          <div
            className={styles.button}
            data-active={button.id === currentId ? 'true' : 'false'}
            key={button.id}
            onClick={() => setCurrentId(button.id)}
          >
            <span className={styles.label}>{button.label}</span>
            {button.content}
          </div>
        ))}
      </div>
    </div>
  )
}
