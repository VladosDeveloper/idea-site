import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string({ message: 'Name is required' }).min(1),
  nick: z
    .string({ message: 'Nick is required' })
    .min(1)
    .regex(/^[a-z0-9-]+$/, { message: 'Nick may contain only lowercase letters, numbers and dashes' }),
  description: z.string({ message: 'Description is required' }).min(1),
  text: z.string({ message: 'Text is required' }).min(10, { message: 'Text should be at least 10 characters long' }),
})
