import { ServerResponse } from 'http'

export function sendJSON(
  status: number,
  message: unknown,
  res: ServerResponse
) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  })
  res.end(JSON.stringify(message))
}
