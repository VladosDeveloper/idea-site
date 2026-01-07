import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import styles from './index.module.scss'

type IPath = {
  to: string
  text: string
}

const paths: IPath[] = [
  { to: routes.getAllIdeasRoute(), text: 'All Ideas' },
  { to: routes.createNewIdeaRoute(), text: 'Add Idea' },
]

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>IdeaNick</div>
        <ul className={styles.menu}>
          {paths.map((path, i) => (
            <li key={i} className={styles.item}>
              <Link className={styles.link} to={path.to}>
                {path.text}
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
