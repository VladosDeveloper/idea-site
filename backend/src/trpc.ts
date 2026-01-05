import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const trpc = initTRPC.create()

const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: _.times(100, (j) => `<p>Some text ${j}</p>`).join(''),
}))

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas: ideas.map((idea) => _.omit(idea, ['text'])) }
  }),
  getIdea: trpc.procedure.input(z.object({ ideaNick: z.string() })).query(({ input }) => {
    const idea = ideas.find((idea) => idea.nick === input.ideaNick)
    return { idea: idea ?? null }
  }),
})

export type TrpcRouter = typeof trpcRouter
