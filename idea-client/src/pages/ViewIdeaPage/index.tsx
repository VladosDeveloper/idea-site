import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '@/components/segment'
import type { ViewIdeaRouteParams } from '@/lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'
import styles from './index.module.scss'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick })

  if (isLoading || isFetching) {
    return <span>loading...</span>
  }

  if (isError) {
    return <span>error... {error.message}</span>
  }

  if (!data?.idea) {
    return <span>Idea was not found</span>
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={styles.createdAt}>Created at: {format(data.idea.createdAt, 'dd.MM.yyyy')}</div>
      <div className={styles.author}>
        Author: <span>{data.idea.author.nick}</span>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
