import { trpc } from '../lib/tRPCInstance'
import { createIdeaTrpcRoute } from './createIdea'
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'

export const trpcRouter = trpc.router({
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
