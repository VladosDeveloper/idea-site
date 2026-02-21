import { Activity } from 'react'
import { zSignUpTrpcInput } from '@idea-site/backend/src/router/signUp/input'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form.tsx'
import { getSignInRoute } from '@/lib/routes.ts'
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

export const SignUpPage = () => {
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const navigate = useNavigate()

  const { formik, alertProps, buttonProps, isHidden } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: signUpSubmitFormData,
    onSubmit: async (values) => {
      await signUp.mutateAsync(values)
      void (await trpcUtils.invalidate())
      void navigate(getSignInRoute())
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  })

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" inputValue="nick" formik={formik} />
          <Input label="Password" inputValue="password" type="password" formik={formik} />
          <Input label="Password again" inputValue="passwordAgain" type="password" formik={formik} />
          <Activity mode={isHidden ? 'hidden' : 'visible'}>
            <Toaster {...alertProps} />
          </Activity>

          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
