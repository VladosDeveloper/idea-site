import { trpc } from '../../lib/tRPCInstance'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exIdea) {
    throw new Error('There is the same idea with this nick')
  }

  await ctx.prisma.idea.create({
    data: input,
  })

  return true
})
