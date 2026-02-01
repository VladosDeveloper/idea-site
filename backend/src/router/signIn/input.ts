import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  nick: z.string().min(1),
  password: z.string().min(1),
})

export type SignInTrpcInput = z.infer<typeof zSignInTrpcInput>
