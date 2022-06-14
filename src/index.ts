import * as dotenv from 'dotenv'
import { createServer } from 'http'
import { resolve } from 'path'
import { cwd } from 'process'
import { getUsers } from './controllers/user'

dotenv.config({ path: resolve(cwd(), '.env') })

const server = createServer((req, res) => {
  if (!req.url) return

  const url = req.url.replace(/\/$/, '')

  if (url === '/api/users' && req.method === 'GET') {
    getUsers(req, res)
  } else {
    res.end()
  }
})

const port = process.env.PORT || 1337
server.listen(port).on('listening', () => {
  console.log(`HTTP is listening on ${port}`)
})
