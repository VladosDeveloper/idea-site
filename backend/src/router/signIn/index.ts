import { trpc } from '../../lib/tRPCInstance'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zSignInTrpcInput } from './input'

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ ctx, input }) => {
  const exUser = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  })

  if (!exUser) {
    throw new Error('User not found')
  }
  return true
})
