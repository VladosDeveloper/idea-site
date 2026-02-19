import { type ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

export type Props = {
  color: 'red' | 'green'
  children?: ReactNode
}
export const Toaster = ({ color, children }: Props) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 300) // Время анимации исчезновения
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className={cn({ [styles.toastSlide]: true, [styles[color]]: true, [styles.toastExit]: isExiting })}>
      {children}
    </div>
  )
}
