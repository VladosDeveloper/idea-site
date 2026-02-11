import cors from 'cors'
import express from 'express'
import { type AppContext, createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/tRPCInstance'
import { trpcRouter } from './router'

let ctx: AppContext | null = null

void (async () => {
  try {
    ctx = createAppContext()

    const expressApp = express()

    expressApp.use(cors())

    applyPassportToExpressApp(expressApp, ctx)

    applyTrpcToExpressApp(expressApp, ctx, trpcRouter)

    expressApp.listen(env.PORT, () => {
      console.info('Server started on port http://localhost:3000')
    })
  } catch (err) {
    console.error(err)
    await ctx?.stop()
  }
})()
