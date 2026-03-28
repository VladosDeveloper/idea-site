import { Link } from 'react-router-dom'
import { InfiniteScrollTrigger } from '@/components/InfiniteScrollTrigger'
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

  const ideas = data?.pages.flatMap((page) => page.ideas)
  const loadMore = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <Segment title={'All Ideas'}>
      {isLoading || isRefetching ? (
        <span>loading...</span>
      ) : isError ? (
        <Toaster color="red">{error.message}</Toaster>
      ) : (
        <div className={styles.ideas}>
          {ideas?.map((idea) => (
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
      )}
      <InfiniteScrollTrigger
        onLoadMore={() => loadMore()}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
        loader={<div className="loader">Loading more...</div>}
        endMessage={<div className="end-message">No more ideas to show</div>}
      />
    </Segment>
  )
}
