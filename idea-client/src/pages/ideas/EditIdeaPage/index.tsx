import { Activity } from 'react'
import { zUpdateIdeaTrpcInput } from '@idea-site/backend/src/router/ideas/updateIdea/input'
import { canEditIdea } from '@idea-site/backend/src/utils/can'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form.tsx'
import { withPageWrapper } from '@/lib/pageWrapper'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '@/lib/routes'
import { trpc } from '@/lib/trpc'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(canEditIdea(ctx.me, idea), 'An idea can only be edited by the author')
    return {
      idea,
    }
  },
})(({ idea }) => {
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
})
