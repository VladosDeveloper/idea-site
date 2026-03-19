import { toClientMe } from '../../../lib/models'
import { trpc } from '../../../lib/tRPCInstance'

export const getMeTrpcRoute = trpc.procedure.query(({ ctx }) => {
  return { me: toClientMe(ctx.me) }
})
