import { Activity } from 'react'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form'
import { trpc } from '@/lib/trpc'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

type Props = {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>
}

export const BlockIdea = ({ idea }: Props) => {
  const blockIdea = trpc.blockIdea.useMutation()
  const trpcUtils = trpc.useUtils()

  const { formik, alertProps, buttonProps, isHidden } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id })
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Activity mode={isHidden ? 'hidden' : 'visible'}>
          <Toaster {...alertProps} />
        </Activity>
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  )
}
