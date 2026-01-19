import { zCreateIdeaTrpcInput } from '@idea-site/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { Activity, useState } from 'react'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { trpc } from '@/lib/trpc.tsx'

export type SubmitFormData = z.infer<typeof zCreateIdeaTrpcInput>

export const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const createIdea = trpc.createIdea.useMutation()

  const formik = useFormik<SubmitFormData>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaTrpcInput) as unknown as (
      values: SubmitFormData
    ) => Partial<Record<keyof SubmitFormData, string>>,
    onSubmit: async (values) => {
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (e: any) {
        setSubmittingError(e.message)
        setTimeout(() => setSubmittingError(null), 3000)
      }
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input onChange={formik.handleChange} inputTitle="Name" inputValue={formik.values.name} formik={formik} />
          <Input onChange={formik.handleChange} inputTitle="Nick" inputValue={formik.values.nick} formik={formik} />
          <Input
            onChange={formik.handleChange}
            inputTitle="Description"
            inputValue={formik.values.description}
            formik={formik}
          />
          <Input
            onChange={formik.handleChange}
            inputTitle="Text"
            inputValue={formik.values.text}
            as="textarea"
            formik={formik}
          />

          <Activity mode={successMessageVisible ? 'visible' : 'hidden'}>
            <Toaster color={'green'}>
              <p>Idea was successfully created</p>
            </Toaster>
          </Activity>

          <Activity mode={!!submittingError ? 'visible' : 'hidden'}>
            <Toaster color={'red'}>
              <p>{submittingError}</p>
            </Toaster>
          </Activity>

          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
