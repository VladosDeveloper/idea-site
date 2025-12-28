import { trpc } from '../../lib/trpc.tsx'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <span>loading...</span>
  }

  if (isError) {
    return <span>error... {error.message}</span>
  }

  return (
    <div>
      {data?.ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
