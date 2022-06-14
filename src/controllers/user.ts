import { IncomingMessage, ServerResponse } from 'http'
import * as User from '../models/user'

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = await User.findAll()

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(users))
  } catch (error) {
    console.error(error)
  }
}
