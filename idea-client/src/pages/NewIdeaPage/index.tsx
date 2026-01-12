import { useFormik } from 'formik'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'

export type SubmitFormData = Record<string, any>

export const NewIdeaPage = () => {
  const formik = useFormik<SubmitFormData>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      if (!values.name) {
        errors.name = 'Name is required'
      }
      if (!values.nick) {
        errors.nick = 'Nick is required'
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        errors.nick = 'Nick may contain only lowercase letters, numbers and dashes'
      }
      if (!values.description) {
        errors.description = 'Description is required'
      }
      if (!values.text) {
        errors.text = 'Text is required'
      } else if (values.text.length < 100) {
        errors.text = 'Text should be at least 100 characters long'
      }
      return errors
    },
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
