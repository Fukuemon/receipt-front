import styles from './style.module.css'

interface LoadingProps {
  description?: string
}

export const Loading = ({ description }: LoadingProps) => (
  <div className={styles.loading}>
    <div className={styles.circle}></div>
    {description !== undefined && (
      <div className={styles.description}>{description}</div>
    )}
  </div>
)
