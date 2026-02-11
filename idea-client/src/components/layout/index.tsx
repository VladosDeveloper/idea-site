import { Link, Outlet } from 'react-router-dom'
import { trpc } from '@/lib/trpc.tsx'
import * as routes from '../../lib/routes'
import styles from './index.module.scss'
import type { User } from '@idea-site/backend/src/prisma/generated/prisma-client'

type IPath = {
  to: string
  text: string
}

const paths: IPath[] = [
  { to: routes.getAllIdeasRoute(), text: 'All Ideas' },
  { to: routes.createNewIdeaRoute(), text: 'Add Idea' },
  { to: routes.getSignUpRoute(), text: 'Sign Up' },
  { to: routes.getSignInRoute(), text: 'Sign In' },
  { to: routes.getSignOutRoute(), text: 'Log out' },
]

const newPaths = (exUser: Pick<User, 'id' | 'nick'> | null | undefined, routes: IPath[]): IPath[] => {
  if (exUser) {
    return routes.filter((rout) => rout.text !== 'Sign In' && rout.text !== 'Sign Up')
  }

  return routes.filter((rout) => rout.text !== 'Log out')
}

export const Layout = () => {
  const { data, isLoading } = trpc.getMe.useQuery()
  const routes = newPaths(data?.me, paths)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>IdeaNick</div>
        <ul className={styles.menu}>
          {routes.map((path, i) => (
            <li key={i} className={styles.item}>
              <Link className={styles.link} to={path.to}>
                {path.text} {data?.me?.nick && path.text === 'Log out' && data.me.nick}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
