import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { trpcRouter } from './trpc'
import cors from 'cors'

const expressApp = express()

expressApp.use(cors())

expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
)

expressApp.get('/ping', (req, res) => {
  res.send('Pong!')
})

expressApp.listen(3000, () => {
  console.info('Server started on port http://localhost:3000')
})
