import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'

const ROUTES_DIR = path.resolve('src/router')
const OUTPUT_FILE = path.join(ROUTES_DIR, 'index.ts')

const routeIndexes = globSync('**/index.ts', {
  cwd: ROUTES_DIR,
  ignore: ['index.ts'],
})

const routes = routeIndexes.map((file) => {
  const routePath = path.dirname(file)

  const normalizedPath = routePath.replace(/\\/g, '/')

  const routeName = path.basename(routePath)

  return {
    routePath: normalizedPath,
    routeName,
    importName: `${routeName}TrpcRoute`,
    importPath: `./${normalizedPath}`,
  }
})

const imports = routes.map((r) => `import { ${r.importName} } from '${r.importPath}'`).join('\n')

const routerObject = routes.map((r) => `  ${r.routeName}: ${r.importName},`).join('\n')

const content = `
import { trpc } from '../lib/tRPCInstance'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
${imports}

export const trpcRouter = trpc.router({
${routerObject}
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
`

fs.writeFileSync(OUTPUT_FILE, content.trim() + '\n')

console.info('✔ tRPC routes index generated')
