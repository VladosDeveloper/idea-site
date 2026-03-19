import { toClientMe } from '../../../lib/models'
import { trpc } from '../../../lib/tRPCInstance'
import { zUpdateProfileTrpcInput } from './input'

export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw new Error('Unauthorized!')
  }

  if (ctx.me.nick !== input.nick) {
    const exUsername = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exUsername) {
      throw new Error('User with this nick already exists!')
    }
  }
  const updateMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: input,
  })
  ctx.me = updateMe
  return toClientMe(ctx.me)
})
