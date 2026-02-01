import { Link } from 'react-router-dom'
import { Segment } from '@/components/segment'
import { getViewIdeaRoute } from '@/lib/routes.ts'
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
    <Segment title={'All Ideas'}>
      <div className={styles.ideas}>
        {data?.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <Segment
              title={
                <Link className={styles.ideaLink} to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              size={2}
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
