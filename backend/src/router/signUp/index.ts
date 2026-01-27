import { trpc } from '../../lib/tRPCInstance'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (exUser) {
    throw new Error('User already exists')
  }

  await ctx.prisma.user.create({
    data: input,
  })

  return true
})
