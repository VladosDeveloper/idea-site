import _ from 'lodash'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/tRPCInstance'

export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  return { ideas: ideas.map((idea) => _.omit(idea, ['text'])) }
})
