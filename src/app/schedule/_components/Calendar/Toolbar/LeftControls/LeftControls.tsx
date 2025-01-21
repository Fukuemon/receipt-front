import styles from './style.module.css'

import PrevIcon from '/public/icons/arrow-left.svg'
import NextIcon from '/public/icons/arrow-right.svg'

export const LeftControls: React.FC<{
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}> = ({ onPrev, onNext, onToday }) => {
  const toDay = '今日'
  return (
    <div className={styles.left}>
      <button onClick={onPrev}>
        <PrevIcon height={24} width={24} />
      </button>
      <button className={styles.today} onClick={onToday}>
        {toDay}
      </button>
      <button onClick={onNext}>
        <NextIcon height={24} width={24} />
      </button>
    </div>
  )
}
