import { Helmet } from 'react-helmet-async'
import { Segment } from '@/components/segment'
import { withPageWrapper } from '@/lib/pageWrapper'
import { UpdatePassword } from '@/pages/auth/EditProfilePage/UpdatePassword'
import { UpdateProfileInfo } from '@/pages/auth/EditProfilePage/UpdateProfileInfo'
import styles from './index.module.scss'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <>
      <Segment title="Edit Profile">
        <Helmet>
          <title>Edit profile</title>
        </Helmet>
        <div className={styles.container}>
          <Segment title="General" size={2}>
            <UpdateProfileInfo me={me} />
          </Segment>
          <Segment title="Password" size={2}>
            <UpdatePassword />
          </Segment>
        </div>
      </Segment>
    </>
  )
})
