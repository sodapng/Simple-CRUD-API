import request from 'supertest'
import { server } from '..'
import { stopServer } from './testUtils'

describe('Сценарий 3', () => {
  afterAll(async () => {
    await stopServer(server)
  })

  it('Requests to non-existing endpoints (e.g. some-non/existing/resource) should be handled (server should answer with status code 404 and corresponding human-friendly message)', async () => {
    const res = await request(server).get('/some-non/existing/resource')

    expect(res.statusCode).toBe(404)
  })
  it('Bad body for POST. Server should answer with status code 400', async () => {
    const res = await request(server).post(`/api/users`).send('error')

    expect(res.statusCode).toBe(400)
  })
})
