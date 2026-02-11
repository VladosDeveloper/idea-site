import { type Request } from 'express'
import { type User } from '../prisma/generated/prisma-client'

export type ExpressRequest = Request & {
  user: User | undefined
}
