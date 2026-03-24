import { Link } from 'react-router-dom'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { getViewIdeaRoute } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc'
import styles from './index.module.scss'

export const ViewAllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )

  return (
    <Segment title={'All Ideas'}>
      {isLoading || isRefetching ? (
        <span>loading...</span>
      ) : isError ? (
        <Toaster color="red">{error.message}</Toaster>
      ) : (
        <div className={styles.ideas}>
          {data?.pages
            .flatMap((page) => page.ideas)
            .map((idea) => (
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
          <div className={styles.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  )
}
