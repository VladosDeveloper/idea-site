import { Activity } from 'react'
import { zUpdateProfileTrpcInput } from '@idea-site/backend/src/router/auth/updateProfile/input'
import { Button } from '@/components/Button'
import { FormItems } from '@/components/FormItems'
import { Input } from '@/components/Input'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form'
import { withPageWrapper } from '@/lib/pageWrapper'
import { trpc } from '@/lib/trpc'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({
    me: ctx.me!,
  }),
})(({ me }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps, isHidden } = useForm({
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
    <Segment title="Edit Profile">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" inputValue="nick" formik={formik} />
          <Input label="Name" inputValue="name" formik={formik} />
          <Activity mode={isHidden ? 'hidden' : 'visible'}>
            <Toaster {...alertProps} />
          </Activity>
          <Button {...buttonProps}>Update profile</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
