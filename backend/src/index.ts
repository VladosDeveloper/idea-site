import cors from 'cors'
import express from 'express'
import { applyTrpcToExpressApp } from './lib/tRPCInstance'
import { trpcRouter } from './router'

const expressApp = express()

expressApp.use(cors())

applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.info('Server started on port http://localhost:3000')
})
