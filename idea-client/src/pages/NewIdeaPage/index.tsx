import { zCreateIdeaTrpcInput } from '@idea-site/backend/src/router/createIdea/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { trpc } from '@/lib/trpc.tsx'

export type SubmitFormData = z.infer<typeof zCreateIdeaTrpcInput>

export const NewIdeaPage = () => {
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
      await createIdea.mutateAsync(values)
    },
  })

  return (
    <Segment title="New Idea">
      <form onSubmit={formik.handleSubmit}>
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

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
