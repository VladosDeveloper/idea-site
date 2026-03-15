import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
}: {
  title?: string
  message?: string
}) => {
  return (
    <Segment title={title}>
      <Toaster color="red">{message}</Toaster>
    </Segment>
  )
}
