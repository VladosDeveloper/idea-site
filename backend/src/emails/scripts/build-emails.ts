import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { globSync } from 'glob'
import { minify } from 'html-minifier'
import mjml2html from 'mjml'

// аналог __dirname в ES modules
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT = path.resolve(__dirname, '../')
const OUTPUT = path.resolve(INPUT, 'dist')

// очистка dist
fs.rmSync(OUTPUT, { recursive: true, force: true })
fs.mkdirSync(OUTPUT, { recursive: true })

// glob (в ES версии нужен .sync через default)
const files = globSync(`${INPUT}/[!_]*.mjml`)

files.forEach((file) => {
  const rawPath = file.replace(/\\/g, '/')

  const mjml = fs.readFileSync(rawPath, 'utf-8')

  buildMjml(mjml)
    .then((res) => {
      const fileName = path.basename(rawPath).replace('.mjml', '.html')

      const outputPath = path.join(OUTPUT, fileName)
      fs.writeFileSync(outputPath, res)

      console.info(`✅ Built: ${fileName}`)
    })
    .catch((err) => {
      console.error(err)
    })
})

async function buildMjml(mjml: string) {
  const { html, errors } = await mjml2html(mjml, {
    minify: false,
    validationLevel: 'strict',
  })

  if (errors?.length) {
    console.error('MJML errors:', errors)
  }

  const minified = minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
  })

  return minified
}

console.info('🚀 Emails build complete')
