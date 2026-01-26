import { PrismaClient } from '../prisma/generated/prisma-client'
import 'dotenv/config'

export const createAppContext = () => {
  const prisma = new PrismaClient()
  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect()
    },
  }
}

export type AppContext = Awaited<ReturnType<typeof createAppContext>>
