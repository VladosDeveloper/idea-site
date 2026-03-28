import cn from 'classnames'
import styles from './index.module.scss'

type Props = {
  type: 'page' | 'section'
}
export const Loader = ({ type }: Props) => {
  return (
    <span
      className={cn({
        [styles.loader]: true,
        [styles[`type-${type}`]]: true,
      })}
    />
  )
}
