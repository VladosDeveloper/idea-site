import { Activity, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import EditIcon from '@/assets/edit_pen.svg?react'
import { type EditIdeaRouteParams, getEditIdeaRoute } from '@/lib/routes.ts'
import styles from './index.module.scss'

type Props = {
  title: ReactNode
  size?: 1 | 2
  description?: string
  children?: ReactNode
  editMode?: boolean
}

export const Segment = ({ children, size = 1, description, title, editMode = false }: Props) => {
  const { ideaNick } = useParams() as EditIdeaRouteParams

  return (
    <div className={styles.segment}>
      {size === 1 ? (
        <div className={styles.headingWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <Activity mode={editMode ? 'visible' : 'hidden'}>
            <Link to={getEditIdeaRoute({ ideaNick })} className={styles.goToEditPageButton}>
              <EditIcon />
            </Link>
          </Activity>
        </div>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  )
}
