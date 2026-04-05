import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string({ description: 'Name is required' }).min(1),
  nick: z
    .string({ description: 'Nick is required' })
    .min(1)
    .regex(/^[a-z0-9-]+$/, { message: 'Nick may contain only lowercase letters, numbers and dashes' }),
  description: z.string({ description: 'Description is required' }).min(1),
  text: z
    .string({ description: 'Text is required' })
    .min(10, { message: 'Text should be at least 10 characters long' }),
})
