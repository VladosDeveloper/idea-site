import { trpc } from '../../../lib/tRPCInstance'
import { zSetIdeaLikeTrpcInput } from './input'

export const setIdeaLikeTrpcRoute = trpc.procedure.input(zSetIdeaLikeTrpcInput).mutation(async ({ ctx, input }) => {
  const { ideaId, isLikeByMe } = input

  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }

  const userId = ctx.me.id

  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  })

  const existingLike = await ctx.prisma.ideaLikes.findUnique({
    where: {
      userId_ideaId: {
        ideaId,
        userId,
      },
    },
  })

  if (!idea) {
    throw new Error('NOT_FOUND')
  }

  if (existingLike) {
    await ctx.prisma.ideaLikes.delete({
      where: {
        id: existingLike.id,
      },
    })
  } else {
    await ctx.prisma.ideaLikes.create({
      data: {
        ideaId,
        userId,
      },
    })
  }

  const likesCount = await ctx.prisma.ideaLikes.count({
    where: {
      ideaId,
    },
  })

  return {
    idea: {
      id: idea.id,
      likesCount,
      isLikeByMe,
    },
  }
})
