import { ErrorPageComponent } from '@/components/ErrorPageComponent'

type Props = {
  title?: string
  message?: string
}

export const NotFoundPage = ({ message = "This page doesn't exist", title = 'Not found' }: Props) => (
  <ErrorPageComponent title={title} message={message} />
)
