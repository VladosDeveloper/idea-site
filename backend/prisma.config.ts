import { defineConfig, env } from 'prisma/config'
import dotenv = require('dotenv')

dotenv.config()

export default defineConfig({
  schema: './src/prisma/schema.prisma',

  datasource: {
    url: env('DATABASE_URL'),
  },
})
