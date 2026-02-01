import { Activity, useState } from 'react'
import { zSignUpTrpcInput } from '@idea-site/backend/src/router/signUp/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { trpc } from '@/lib/trpc.tsx'

const signUpSubmitFormData = zSignUpTrpcInput.extend({ passwordAgain: z.string().min(1) }).superRefine((arg, ctx) => {
  if (arg.password !== arg.passwordAgain) {
    ctx.addIssue({
      code: 'custom',
      message: 'Password must be the same',
      path: ['passwordAgain'],
    })
  }
})

type SignUpInputFormData = z.infer<typeof signUpSubmitFormData>

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()

  const formik = useFormik<SignUpInputFormData>({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(signUpSubmitFormData) as unknown as (
      values: SignUpInputFormData
    ) => Partial<Record<keyof SignUpInputFormData, string>>,
    onSubmit: async (values) => {
      try {
        await signUp.mutateAsync(values)
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
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="nick" inputTitle="Nick" formik={formik} />
          <Input label="password" inputTitle="Password" type="password" formik={formik} />
          <Input label="passwordAgain" inputTitle="Password again" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Toaster color="red">Some fields are invalid</Toaster>}
          <Activity mode={submittingError ? 'visible' : 'hidden'}>
            <Toaster color="red">{submittingError}</Toaster>
          </Activity>
          <Activity mode={successMessageVisible ? 'visible' : 'hidden'}>
            <Toaster color="green">Thanks for sign up!</Toaster>
          </Activity>

          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
