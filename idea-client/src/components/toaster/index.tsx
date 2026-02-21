import { type ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

export type ToasterProps = {
  color: 'red' | 'green'
  children?: ReactNode
}
export const Toaster = ({ color, children }: ToasterProps) => {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn({ [styles.toastSlide]: true, [styles[color]]: true, [styles.toastExit]: isExiting })}>
      {children}
    </div>
  )
}
