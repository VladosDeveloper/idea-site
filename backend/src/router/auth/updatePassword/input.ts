import { z } from 'zod'

export const zUpdatePasswordTrpcInput = z.object({
  newPassword: z.string().min(1),
  oldPassword: z.string().min(1),
})
