import { IncomingMessage } from 'http'
import { IUser } from '../models/user'

export async function getPostData(req: IncomingMessage): Promise<IUser> {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.setEncoding('utf8')

      req
        .on('data', (chunk) => {
          body += chunk
        })
        .on('end', () => {
          resolve(JSON.parse(body))
        })
    } catch (error) {
      reject(error)
    }
  })
}
