import { ServerResponse } from 'http'
import { pid } from 'process'

export function sendJSON(
  status: number,
  message: unknown,
  res: ServerResponse
) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    PID: pid,
  })
  res.end(JSON.stringify(message))
}
