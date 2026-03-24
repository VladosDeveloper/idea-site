import { zUpdateProfileTrpcInput } from '@idea-site/backend/src/router/auth/updateProfile/input'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form'
import { trpc } from '@/lib/trpc'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

export const UpdateProfileInfo = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated successfully.',
    resetOnSuccess: false,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Nick" inputValue="nick" formik={formik} />
        <Input label="Name" inputValue="name" formik={formik} />
        {updateProfile.isError || (updateProfile.isSuccess && <Toaster {...alertProps} />)}
        <Button {...buttonProps}>Update profile</Button>
      </FormItems>
    </form>
  )
}
