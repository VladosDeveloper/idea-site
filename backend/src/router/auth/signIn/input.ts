import { z } from 'zod'

export const zSignInTrpcInput = z.object({
  nick: z.string().trim().min(1, { message: 'nick should be more than 1 character' }),
  password: z.string().trim().min(1, { message: 'password should be more than 1 character' }),
})

export type SignInTrpcInput = z.infer<typeof zSignInTrpcInput>
