import { memo, type PropsWithChildren } from 'react'
import styles from './index.module.scss'

const FormItemsComponent = ({ children }: PropsWithChildren) => {
  return <div className={styles['form-items']}>{children}</div>
}

export const FormItems = memo(FormItemsComponent) as typeof FormItemsComponent
