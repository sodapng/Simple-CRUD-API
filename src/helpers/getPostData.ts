import { IncomingMessage, ServerResponse } from 'http'
import { IUser } from '../models/user'
import { sendJSON } from './sendJSON'

export async function getPostData(
  req: IncomingMessage,
  res: ServerResponse
): Promise<IUser> {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.setEncoding('utf8')

      req
        .on('data', (chunk) => {
          body += chunk
        })
        .on('end', () => {
          try {
            resolve(JSON.parse(body))
          } catch (error) {
            sendJSON(400, { message: 'bad request' }, res)
            reject(error)
          }
        })
    } catch (error) {
      reject(error)
    }
  })
}
