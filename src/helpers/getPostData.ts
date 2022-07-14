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
            if (error instanceof Error) {
              sendJSON(
                400,
                {
                  error: `No luck processing the body: ${error.message}`,
                },
                res
              )
            }
            reject(error)
          }
        })
    } catch (error) {
      sendJSON(
        500,
        {
          error: 'Oops, something went wrong. Try to refresh this page.',
        },
        res
      )
      reject(error)
    }
  })
}
