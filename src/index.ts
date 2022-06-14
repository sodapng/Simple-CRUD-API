import * as dotenv from 'dotenv'
import { createServer } from 'http'
import { resolve } from 'path'
import { cwd } from 'process'

dotenv.config({ path: resolve(cwd(), '.env') })

const server = createServer((req, res) => {
  res.end('Hello')
})

const port = process.env.PORT || 1337
server.listen(port).on('listening', () => {
  console.log(`HTTP is listening on ${port}`)
})
