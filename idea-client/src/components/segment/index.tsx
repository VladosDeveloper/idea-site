import type { ReactNode } from 'react'
import styles from './index.module.scss'

type Props = {
  title: ReactNode
  size?: 1 | 2
  description?: string
  children?: ReactNode
}

export const Segment = ({ children, size = 1, description, title }: Props) => {
  return (
    <div className={styles.segment}>
      {size === 1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  )
}
