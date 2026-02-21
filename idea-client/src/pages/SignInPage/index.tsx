import { Activity } from 'react'
import { zSignInTrpcInput } from '@idea-site/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form.tsx'
import { getAllIdeasRoute } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc.tsx'

export const SignInPage = () => {
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()
  const navigate = useNavigate()

  const { formik, alertProps, buttonProps, isHidden } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 9999999 })
      void (await trpcUtils.invalidate())
      void navigate(getAllIdeasRoute())
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  })

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" inputValue="nick" formik={formik} />
          <Input label="Password" inputValue="password" type="password" formik={formik} />
          <Activity mode={isHidden ? 'hidden' : 'visible'}>
            <Toaster {...alertProps} />
          </Activity>

          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
