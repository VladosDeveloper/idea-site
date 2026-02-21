import { Activity } from 'react'
import { zCreateIdeaTrpcInput } from '@idea-site/backend/src/router/createIdea/input'
import { type z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form.tsx'
import { trpc } from '@/lib/trpc.tsx'

export type SubmitFormData = z.infer<typeof zCreateIdeaTrpcInput>

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()

  const { formik, alertProps, buttonProps, isHidden } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateIdeaTrpcInput,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
    },
    resetOnSuccess: true,
    successMessage: 'Idea was successfully created',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" inputValue="name" formik={formik} />
          <Input label="Nick" inputValue="nick" formik={formik} />
          <Input label="Description" inputValue="description" formik={formik} />
          <Input label="Text" inputValue="text" as="textarea" formik={formik} />

          <Activity mode={isHidden ? 'hidden' : 'visible'}>
            <Toaster {...alertProps} />
          </Activity>

          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
