import { Activity } from 'react'
import { zUpdateIdeaTrpcInput } from '@idea-site/backend/src/router/updateIdea/input'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form.tsx'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '@/lib/routes'
import { trpc } from '@/lib/trpc'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, buttonProps, alertProps, isHidden } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
      void navigate(getViewIdeaRoute({ ideaNick: values.nick }))
    },
    resetOnSuccess: true,
    showValidationAlert: true,
    successMessage: 'Idea successfully changed.',
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" inputValue="name" formik={formik} />
          <Input label="Nick" inputValue="nick" formik={formik} />
          <Input label="Description" inputValue="description" maxWidth={500} formik={formik} />
          <Input label="Text" inputValue="text" formik={formik} as="textarea" />
          <Activity mode={isHidden ? 'hidden' : 'visible'}>
            <Toaster {...alertProps} />
          </Activity>
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams
  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getMeResult.isLoading || getIdeaResult.isFetching || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  const idea = getIdeaResult.data?.idea
  const me = getMeResult.data?.me

  if (!idea) {
    return <span>Idea not found</span>
  }

  if (!me) {
    return <span>You're unauthorized</span>
  }

  if (me.id !== idea.authorId) {
    return <span>You're can't edit this idea</span>
  }

  return <EditIdeaComponent idea={idea} />
}
