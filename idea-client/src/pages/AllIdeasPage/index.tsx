import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '../../lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'
import styles from './index.module.scss'

export const ViewAllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <span>loading...</span>
  }

  if (isError) {
    return <span>error... {error.message}</span>
  }

  return (
    <div>
      <h1 className={styles.title}>All Ideas</h1>
      <div className={styles.ideas}>
        {data?.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <h2 className={styles.ideaName}>
              <Link className={styles.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                {idea.name}
              </Link>
            </h2>
            <p className={styles.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
