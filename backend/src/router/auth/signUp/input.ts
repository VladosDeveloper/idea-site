import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9]+$/, { message: 'Nick may contains only lowercase letters, numbers and dashes' }),
  email: z.string().min(1).email(),
  password: z.string().min(1),
})

export type SignUpTrpcInput = z.infer<typeof zSignUpTrpcInput>
