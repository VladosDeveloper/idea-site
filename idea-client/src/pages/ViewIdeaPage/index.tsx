import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '@/components/segment'
import { withPageWrapper } from '@/lib/pageWrapper'
import type { ViewIdeaRouteParams } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc'
import styles from './index.module.scss'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ ideaNick })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  setProps: ({ queryResult, ctx }) => ({
    idea: queryResult.data.idea!,
    me: ctx.me,
  }),
})(({ idea, me }) => {
  const isAuthor = me?.id === idea.authorId

  return (
    <Segment title={idea.name} description={idea.description} editMode={isAuthor}>
      <div className={styles.createdAt}>Created at: {format(idea.createdAt, 'dd.MM.yyyy')}</div>
      <div className={styles.author}>
        Author: <span>{idea.author.nick}</span>
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    </Segment>
  )
})
