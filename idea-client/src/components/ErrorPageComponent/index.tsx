import type { ReactNode } from 'react'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
  children,
}: {
  title?: string
  message?: string
  children?: ReactNode
}) => {
  return (
    <Segment title={title}>
      <Toaster color="red">{message}</Toaster>
      {children}
    </Segment>
  )
}
