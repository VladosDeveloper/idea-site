import { Activity } from 'react'
import { zUpdatePasswordTrpcInput } from '@idea-site/backend/src/router/auth/updatePassword/input'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form'
import { trpc } from '@/lib/trpc'

export const UpdatePassword = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps, isHidden } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((arg, ctx) => {
        if (arg.newPassword !== arg.newPasswordAgain) {
          ctx.addIssue({
            code: 'custom',
            message: 'Passwords must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated successfully',
    resetOnSuccess: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Old password" inputValue="oldPassword" type="password" formik={formik} />
        <Input label="New password" inputValue="newPassword" type="password" formik={formik} />
        <Input label="New password again" inputValue="newPasswordAgain" type="password" formik={formik} />
        <Activity mode={isHidden ? 'hidden' : 'visible'}>
          <Toaster {...alertProps} />
        </Activity>
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}
