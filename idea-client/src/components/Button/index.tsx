import { memo, type ReactNode } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

type ButtonProps = {
  loading?: boolean
  children?: ReactNode
}

const ButtonComponent = ({ children, loading = false }: ButtonProps) => (
  <button className={cn({ [styles.button]: true, [styles.disabled]: loading })} type="submit" disabled={loading}>
    {loading ? 'Submitting...' : children}
  </button>
)

export const Button = memo(ButtonComponent) as typeof ButtonComponent
