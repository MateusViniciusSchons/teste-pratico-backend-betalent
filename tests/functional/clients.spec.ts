import { BASE_URL } from '#tests/helpers/credentials'
import { getAdminToken } from '#tests/helpers/getTokens'
import { test } from '@japa/runner'



test.group('Clients', () => {

  test("Deve retornar erro ao acessar sem token", async ({ client }) => {
    const response = await client.get(BASE_URL+'/clients')

    response.assertStatus(401)
  })

  test('Deve retornar um array de clientes pro admin', async ({ client, assert }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.get(BASE_URL+"/clients").header('Authorization', 'Bearer '+adminToken)

    const body = response.body() as { clients: [] }

    response.assertStatus(200)
    assert.isArray(body.clients)
  })


})