import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'

// export type SubmitFormData = Record<string, any>

const validationSchema = z.object({
  name: z.string({ message: 'Name is required' }).min(1),
  nick: z
    .string({ message: 'Nick is required' })
    .min(1)
    .regex(/^[a-z0-9-]+$/, { message: 'Nick may contain only lowercase letters, numbers and dashes' }),
  description: z.string({ message: 'Description is required' }).min(1),
  text: z.string({ message: 'Text is required' }).min(100, { message: 'Text should be at least 100 characters long' }),
})

export type SubmitFormData = z.infer<typeof validationSchema>

export const NewIdeaPage = () => {
  const formik = useFormik<SubmitFormData>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(validationSchema) as unknown as (
      values: SubmitFormData
    ) => Partial<Record<keyof SubmitFormData, string>>,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
