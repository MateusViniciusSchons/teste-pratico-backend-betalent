import { BASE_URL } from '#tests/helpers/credentials'
import { createGateway } from '#tests/helpers/factories'
import { getAdminToken } from '#tests/helpers/getTokens'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Gateways', (group) => {

  test("Deve retornar erro ao acessar sem token", async ({ client }) => {
      const response = await client.get(BASE_URL+'/products')
  
      response.assertStatus(401)
    })

  test('Deve listar os gateways', async ({ client, assert }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.get(BASE_URL+'/gateways').header('Authorization', 'Bearer '+adminToken)

    const body = response.body() as { gateways: [] }

    response.assertStatus(200)
    assert.isArray(body.gateways)
  })

  test('Deve mudar a prioridade de um gateway', async ({ client }) => {
    const createdGateway = await createGateway()
    const adminToken = await getAdminToken(client)

    const response = await client.patch(BASE_URL+'/gateways/'+createdGateway.id).json({
      priority: createdGateway.priority +1
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(200)
    response.assertBodyContains({
      gateway: {
        id: createdGateway.id,
        priority: createdGateway.priority +1
      }
    })
  })

  test('Deve retornar erro ao duplicar prioridade de um gateway', async ({ client }) => {
    const createdGateway = await createGateway()
    const adminToken = await getAdminToken(client)

    const createdGateway2 = await createGateway()

    const response = await client.patch(BASE_URL+'/gateways/'+createdGateway2.id).json({
      priority: createdGateway.priority
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(409)
  })

  test('Deve desativar um gateway', async ({ client }) => {
    const createdGateway = await createGateway()
    const adminToken = await getAdminToken(client)

    const response = await client.patch(BASE_URL+'/gateways/'+createdGateway.id).json({
      isActive: false
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(200)
    response.assertBodyContains({
      gateway: {
        id: createdGateway.id,
        isActive: false
      }
    })
  })

})