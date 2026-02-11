import { trpc } from '../../lib/tRPCInstance'
import { zUpdateIdeaTrpcInput } from './input'

export const updateIdeaTrpcRoute = trpc.procedure.input(zUpdateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const { ideaId, ...ideaNick } = input

  // Проверка на авторизацию пользователя
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
  })
  if (!exIdea) {
    throw new Error('NOT_FOUND')
  }

  // Проверка на принадлежность идеи
  if (ctx.me.id !== exIdea.authorId) {
    throw new Error('NOT_YOUR_IDEA')
  }

  // Проверка на изменение ника идеи
  if (input.nick !== exIdea.nick) {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    })

    if (idea) {
      throw new Error('IDEA_WITH_THIS_NICK_ALREADY_EXIST')
    }
  }

  await ctx.prisma.idea.update({
    where: {
      id: input.ideaId,
    },
    data: { ...ideaNick },
  })

  return true
})
