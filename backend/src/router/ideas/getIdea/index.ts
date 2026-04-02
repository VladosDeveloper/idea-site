import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/tRPCInstance'

export const getIdeaTrpcRoute = trpc.procedure
  .input(z.object({ ideaNick: z.string() }))
  .query(async ({ ctx, input }) => {
    const rawIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.ideaNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        ideasLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            ideasLikes: true,
          },
        },
      },
    })

    const isLikeByMe = !!rawIdea?.ideasLikes.length
    const ideasLikeCount = rawIdea?._count.ideasLikes || 0
    const idea = rawIdea && { ..._.omit(rawIdea, ['ideasLikes', '_count']), isLikeByMe, ideasLikeCount }

    return { idea }
  })
