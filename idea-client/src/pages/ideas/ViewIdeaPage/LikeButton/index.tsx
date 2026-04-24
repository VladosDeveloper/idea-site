import { LikeIcon } from '@/icons/LikeIcon'
import { trpc } from '@/lib/trpc'
import styles from '../index.module.scss'
import type { TrpcRouterOutput } from '@idea-site/backend/src/router'

export const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useUtils()
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikeByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick })
      if (oldGetIdeaData?.idea) {
        const newIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikeByMe,
            likesCount: oldGetIdeaData.idea.ideasLikeCount + (isLikeByMe ? 1 : -1),
          },
        }
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newIdeaData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick })
    },
  })

  const setIdeaLikeHandler = () => {
    void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikeByMe: !idea.isLikeByMe })
  }

  return (
    <button onClick={setIdeaLikeHandler} className={styles.likeButton}>
      <LikeIcon size={32} className={styles.likeIcon} name={idea.isLikeByMe ? 'likeFilled' : 'likeEmpty'} />
    </button>
  )
}
