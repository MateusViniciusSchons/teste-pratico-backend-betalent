import { ADMIN_CREDENTIALS, BASE_URL } from '#tests/helpers/credentials'
import { test } from '@japa/runner'

test.group('Auth', () => {
  test('Login com credenciais válidas retorna token', async ({ client, assert }) => {
    const response = await client.post(BASE_URL+'/auth/login').json(ADMIN_CREDENTIALS)

    const body = response.body() as { token: string, user: object }

    response.assertStatus(200)
    assert.exists(body.token)
  })

  test("Login com senha errada retorna 401", async ({ client }) => {
    const response = await client.post(BASE_URL+'/auth/login').json({
      email: "admin@betalent.com",
      password: "senhaerrada"
    })

    response.assertStatus(401)
  })

  test("Login sem email retorna 422", async ({ client }) => {
    const response = await client.post(BASE_URL+'/auth/login').json({
      password: "12345678"
    })

    response.assertStatus(422)
  })
})