import { useParams } from 'react-router-dom'
import type { ViewIdeaRouteParams } from '../../lib/routes.ts'
import { trpc } from '../../lib/trpc.tsx'

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
    <div>
      <h2>{data?.idea?.nick}</h2>
      <p>{data?.idea?.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data?.idea?.text }} />
    </div>
  )
}
