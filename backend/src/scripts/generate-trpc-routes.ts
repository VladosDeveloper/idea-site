import fs from 'fs'
import path from 'path'
import { globSync } from 'glob'

const ROUTES_DIR = path.resolve('src/router')
const OUTPUT_FILE = path.join(ROUTES_DIR, 'index.ts')

const routeIndexes = globSync('*/index.ts', {
  cwd: ROUTES_DIR,
})

const routes = routeIndexes.map((file) => {
  const routeName = file.replace(/\\index\.ts$/, '')

  return {
    routeName,
    importName: `${routeName}TrpcRoute`,
    importPath: `./${routeName}`,
  }
})

const imports = routes.map((r) => `import { ${r.importName} } from '${r.importPath}'`).join('\n')

const routerObject = routes.map((r) => `  ${r.routeName}: ${r.importName},`).join('\n')

const content = `
import { trpc } from '../lib/tRPCInstance'
${imports}

export const trpcRouter = trpc.router({
${routerObject}
})

export type TrpcRouter = typeof trpcRouter
`

fs.writeFileSync(OUTPUT_FILE, content.trim() + '\n')

console.info('✔ tRPC routes index generated')
