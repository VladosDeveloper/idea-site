import Img404 from '@/assets/404.png'
import { ErrorPageComponent } from '@/components/ErrorPageComponent'
import styles from './index.module.scss'

type Props = {
  title?: string
  message?: string
}

export const NotFoundPage = ({ message = "This page doesn't exist", title = 'Not found' }: Props) => (
  <ErrorPageComponent title={title} message={message}>
    <img src={Img404} alt="" className={styles.image} width="800" height="600" />
  </ErrorPageComponent>
)
