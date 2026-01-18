import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/tRPCInstance'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  if (ideas.find((idea) => idea.nick === input.nick)) {
    throw new Error('There is the same idea with this nick')
  }
  ideas.unshift(input)
  return true
})
