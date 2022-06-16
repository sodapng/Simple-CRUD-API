import { IncomingMessage, ServerResponse } from 'http'
import { getPostData } from '../helpers/getPostData'
import * as User from '../models/user'

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const foundUsers = await User.findAll()

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(foundUsers))
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
    const foundUser = await User.findById(id)

    if (!foundUser) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: 'user not found' }))
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(foundUser))
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

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id)

    if (!foundUser) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: 'user not found' }))
    } else {
      const body = await getPostData(req)
      const { username, age, hobbies } = body

      const rawUser = {
        username: username || foundUser.username,
        age: age || foundUser.age,
        hobbies: hobbies || foundUser.hobbies,
      }

      const updatedUser = await User.updateById(id, rawUser)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updatedUser))
    }
  } catch (error) {
    console.error(error)
  }
}

export async function deleteUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id)

    if (!foundUser) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: 'user not found' }))
    } else {
      await User.deleteById(id)
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify({ message: `user ${id} removed` }))
    }
  } catch (error) {
    console.error(error)
  }
}
