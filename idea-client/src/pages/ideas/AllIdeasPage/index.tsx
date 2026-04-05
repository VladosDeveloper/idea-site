import { zGetIdeasTrpcInput } from '@idea-site/backend/src/router/ideas/getIdeas/input'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { InfiniteScrollTrigger } from '@/components/InfiniteScrollTrigger'
import { Input } from '@/components/Input'
import { Loader } from '@/components/Loader'
import { Segment } from '@/components/segment'
import { Toaster } from '@/components/toaster'
import { useForm } from '@/lib/form'
import { getViewIdeaRoute } from '@/lib/routes.ts'
import { trpc } from '@/lib/trpc'
import styles from './index.module.scss'

export const ViewAllIdeasPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  })
  const debouncedValue = useDebounceValue(formik.values.search, 500)

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        search: debouncedValue[0],
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
      <div className={styles.filter}>
        <Input label="Search" inputValue="search" formik={formik} maxWidth="100%" />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Toaster color="red">{error.message}</Toaster>
      ) : !data?.pages[0].ideas.length ? (
        <Toaster color="brown">Nothing found by search</Toaster>
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
              >
                Likes: {idea.likesCount}
              </Segment>
            </div>
          ))}
        </div>
      )}
      <InfiniteScrollTrigger
        onLoadMore={() => loadMore()}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
        endMessage={<div className="end-message">No more ideas to show</div>}
      />
    </Segment>
  )
}
