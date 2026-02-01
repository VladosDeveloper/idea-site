import { Activity, useState } from 'react'
import { type SignInTrpcInput, zSignInTrpcInput } from '@idea-site/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { getAllIdeasRoute } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc.tsx'

export const SignInPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const navigate = useNavigate()

  const formik = useFormik<SignInTrpcInput>({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput) as unknown as (
      values: SignInTrpcInput
    ) => Partial<Record<keyof SignInTrpcInput, string>>,
    onSubmit: async (values) => {
      try {
        const { token } = await signIn.mutateAsync(values)
        Cookies.set('token', token, { expires: 9999999 })
        void navigate(getAllIdeasRoute())
      } catch (e: any) {
        setSubmittingError(e.message)
        setTimeout(() => setSubmittingError(null), 3000)
      }
    },
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="nick" inputTitle="Nick" formik={formik} />
          <Input label="password" inputTitle="Password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Toaster color="red">Some fields are invalid</Toaster>}
          <Activity mode={submittingError ? 'visible' : 'hidden'}>
            <Toaster color="red">{submittingError}</Toaster>
          </Activity>

          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
