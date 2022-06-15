import { IncomingMessage, ServerResponse } from 'http'
import { getPostData } from '../helpers/getPostData'
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

export async function getUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const user = await User.findById(id)

    if (!user) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: 'user not found' }))
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(user))
    }
  } catch (error) {
    console.error(error)
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req)
    const { username, age, hobbies } = body

    const rawUser = {
      username,
      age,
      hobbies,
    }

    const createdNewUser = await User.create(rawUser)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(createdNewUser))
  } catch (error) {
    console.error(error)
  }
}
