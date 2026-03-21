import { trpc } from '../../../lib/tRPCInstance'
import { getPasswordHash } from '../../../utils/getPasswordHash'
import { zUpdatePasswordTrpcInput } from './input'

export const updatePasswordTrpcRoute = trpc.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('Unauthorized!')
    }

    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('Old password incorrect')
    }

    const updateMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    })
    ctx.me = updateMe
    return true
  })
