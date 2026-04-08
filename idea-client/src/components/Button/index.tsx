import { memo, type ReactNode } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

type ButtonColor = 'red' | 'green'

export type ButtonProps = {
  loading?: boolean
  children?: ReactNode
  color?: ButtonColor
}

const ButtonComponent = ({ children, loading = false, color = 'green' }: ButtonProps) => (
  <button
    className={cn({
      [styles.button]: true,
      [styles[`color-${color}`]]: true,
      [styles.disabled]: loading,
      [styles.loading]: loading,
    })}
    type="submit"
    disabled={loading}
  >
    {loading ? 'Submitting...' : <span className={styles.text}>{children}</span>}
  </button>
)

export const Button = memo(ButtonComponent) as typeof ButtonComponent
