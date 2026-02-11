import { useState } from 'react'
import { zUpdateIdeaTrpcInput } from '@idea-site/backend/src/router/updateIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { pick } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'
import { type z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { type EditIdeaRouteParams, getViewIdeaRoute } from '@/lib/routes'
import { trpc } from '@/lib/trpc'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const updateIdea = trpc.updateIdea.useMutation()
  type UpdateIdeaFormData = Omit<z.infer<typeof zUpdateIdeaTrpcInput>, 'ideaId'>
  const formik = useFormik<UpdateIdeaFormData>({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })) as unknown as (
      values: UpdateIdeaFormData
    ) => Partial<Record<keyof UpdateIdeaFormData, string>>,
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await updateIdea.mutateAsync({ ideaId: idea.id, ...values })
        void navigate(getViewIdeaRoute({ ideaNick: values.nick }))
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" inputTitle="name" formik={formik} />
          <Input label="Nick" inputTitle="nick" formik={formik} />
          <Input label="Description" inputTitle="description" maxWidth={500} formik={formik} />
          <Input label="Text" inputTitle="text" formik={formik} as="textarea" />
          {!formik.isValid && !!formik.submitCount && <Toaster color="red">Some fields are invalid</Toaster>}
          {submittingError && <Toaster color="red">{submittingError}</Toaster>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
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
