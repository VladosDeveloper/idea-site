import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'
import _ from 'lodash'
import { env } from './env'

type SendEmailArgs = {
  to: string
  subject: string
  templateName: string
  templateVariables?: Record<string, any>
}

const getHtmlTemplates = _.memoize(async () => {
  const htmlPathPatterns = path.resolve(__dirname, './src/emails/dist')
  const htmlPaths = fg.sync([`${htmlPathPatterns.replace(/\\/g, '/')}/*.html`])
  const htmlTemplates: Record<string, string> = {}
  for (const htmlPath of htmlPaths) {
    const templateName = path.basename(htmlPath, '.html')
    htmlTemplates[templateName] = await fs.readFile(htmlPath, 'utf-8')
  }

  return htmlTemplates
})

const getHtmlTemplate = async (templateName: string) => {
  const htmlTemplates = await getHtmlTemplates()
  return htmlTemplates[templateName]
}

const sendEmail = async ({ to, subject, templateName, templateVariables = {} }: SendEmailArgs) => {
  try {
    const htmlTemplate = await getHtmlTemplate(templateName)
    const fullTemplateVariables = {
      ...templateVariables,
      homeUrl: env.WEBAPP_URL,
    }
    console.info('send email', {
      to,
      subject,
      templateName,
      fullTemplateVariables,
      htmlTemplate,
    })
    return { ok: true }
  } catch (error) {
    console.error(error)
    return { ok: false }
  }
}
