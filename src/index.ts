import * as dotenv from 'dotenv'
import { createServer } from 'http'
import { resolve } from 'path'
import { cwd } from 'process'
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './controllers/user'
import { sendJSON } from './helpers/sendJSON'
import { isUUID } from './validators/isUUID'

dotenv.config({ path: resolve(cwd(), '.env') })

export const server = createServer((req, res) => {
  try {
    if (!req.url) return

    if (req.url === '/api/users') {
      if (req.method === 'GET') return getUsers(req, res)

      if (req.method === 'POST') return createUser(req, res)
    }

    if (/^\/api\/users\/[\w-]+$/.test(req.url)) {
      const id = req.url.split('/')[3]

      if (!isUUID(id)) return sendJSON(400, { message: 'invalid id' }, res)

      if (req.method === 'GET') return getUser(req, res, id)

      if (req.method === 'PUT') return updateUser(req, res, id)

      if (req.method === 'DELETE') return deleteUser(req, res, id)
    }

    sendJSON(404, { message: 'not found' }, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
})

const port = process.env.PORT || 1337
server.listen(port).on('listening', () => {
  console.log(`HTTP is listening on ${port}`)
})
