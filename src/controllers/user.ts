import { IncomingMessage, ServerResponse } from 'http'
import { getPostData } from '../helpers/getPostData'
import { sendJSON } from '../helpers/sendJSON'
import * as User from '../models/user'

export async function getUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const foundUsers = await User.findAll()
    sendJSON(200, foundUsers, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
}

export async function getUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id)

    if (!foundUser) return sendJSON(404, { message: 'user not found' }, res)

    sendJSON(200, foundUser, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await getPostData(req, res)
    const { username, age, hobbies } = body

    if (!username || !age || !hobbies)
      return sendJSON(
        400,
        { message: 'body does not contain required fields' },
        res
      )

    const rawUser = {
      username,
      age,
      hobbies,
    }

    const createdNewUser = await User.create(rawUser)
    sendJSON(201, createdNewUser, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
}

export async function updateUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id)

    if (!foundUser) return sendJSON(404, { message: 'user not found' }, res)

    const body = await getPostData(req, res)
    const { username, age, hobbies } = body

    if (!username && !age && !hobbies) {
      return sendJSON(
        400,
        { message: 'body does not contain required fields' },
        res
      )
    }

    const rawUser = {
      username: username || foundUser.username,
      age: age || foundUser.age,
      hobbies: hobbies || foundUser.hobbies,
    }

    const updatedUser = await User.updateById(id, rawUser)
    sendJSON(200, updatedUser, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
}

export async function deleteUser(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const foundUser = await User.findById(id)

    if (!foundUser) return sendJSON(404, { message: 'user not found' }, res)

    await User.deleteById(id)
    sendJSON(204, { message: `user ${id} removed` }, res)
  } catch (error) {
    sendJSON(
      500,
      {
        error: 'Oops, something went wrong. Try to refresh this page.',
      },
      res
    )
  }
}
