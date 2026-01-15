import { z } from 'zod'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/tRPCInstance'

const validationSchema = z.object({
  name: z.string({ message: 'Name is required' }).min(1),
  nick: z
    .string({ message: 'Nick is required' })
    .min(1)
    .regex(/^[a-z0-9-]+$/, { message: 'Nick may contain only lowercase letters, numbers and dashes' }),
  description: z.string({ message: 'Description is required' }).min(1),
  text: z.string({ message: 'Text is required' }).min(100, { message: 'Text should be at least 100 characters long' }),
})

export const createIdeaTrpcRoute = trpc.procedure.input(validationSchema).mutation(({ input }) => {
  ideas.unshift(input)
  return true
})
