import { useEffect, useState } from 'react'
import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '@/components/segment'
import type { ViewIdeaRouteParams } from '@/lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'
import styles from './index.module.scss'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams
  const [isAuthor, setIsAuthor] = useState(true)

  const ideaQuery = trpc.getIdea.useQuery({ ideaNick })
  const meQuery = trpc.getMe.useQuery()

  const idea = ideaQuery.data?.idea
  const me = meQuery.data?.me

  useEffect(() => {
    if (idea && me?.id !== idea.authorId) {
      setIsAuthor(false)
    }
  }, [me, idea])

  if (ideaQuery.isLoading || meQuery.isLoading || ideaQuery.isFetching || meQuery.isFetching) {
    return <span>loading...</span>
  }

  if (ideaQuery.isError) {
    return <span>error... {ideaQuery.error.message}</span>
  }

  if (meQuery.isError) {
    return <span>error... {meQuery.error.message}</span>
  }

  if (!idea) {
    return <span>Idea not found</span>
  }

  return (
    <Segment title={idea.name} description={idea.description} editMode={isAuthor}>
      <div className={styles.createdAt}>Created at: {format(idea.createdAt, 'dd.MM.yyyy')}</div>
      <div className={styles.author}>
        Author: <span>{idea.author.nick}</span>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </Segment>
  )
}
