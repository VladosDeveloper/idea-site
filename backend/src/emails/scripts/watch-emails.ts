import { exec } from 'child_process'
import chokidar from 'chokidar'

console.info('👀 Watching email templates...')

chokidar.watch('./src/emails/**/*.mjml').on('change', () => {
  console.info('🔄 Rebuilding emails...')

  exec('node scripts/build-emails.js', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }
    if (stderr) {
      console.error(stderr)
    }

    console.info(stdout)
  })
})
