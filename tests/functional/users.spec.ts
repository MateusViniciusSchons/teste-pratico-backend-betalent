import { BASE_URL } from '#tests/helpers/credentials'
import { createUser, deleteUser } from '#tests/helpers/factories'
import { getAdminToken, getUserToken } from '#tests/helpers/getTokens'
import { test } from '@japa/runner'

test.group('Users', () => {

   test("Deve retornar erro ao acessar sem token", async ({ client }) => {
    const response = await client.get(BASE_URL+'/users')

    response.assertStatus(401)
  })

  test("Deve retornar erro ao acessar com usuário sem acesso", async ({ client }) => {
    const userToken = await getUserToken(client)

    const response = await client.get(BASE_URL+"/users").header('Authorization', 'Bearer '+userToken)

    response.assertStatus(401)
  })

  test('Deve retornar um array de clientes pro admin', async ({ client, assert }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.get(BASE_URL+"/clients").header('Authorization', 'Bearer '+adminToken)

    const body = response.body() as { clients: [] }

    response.assertStatus(200)
    assert.isArray(body.clients)
  })

  test('Deve criar um usuário', async ({ client }) => {

    const adminToken = await getAdminToken(client)

    const response = await client.post(BASE_URL+"/users").json({
      email: "user-teste7@betalent.com",
      password: "12345678",
      role: "user"
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(201)

    const { user: { id } } = response.body() as { user: { id: number } }
    await deleteUser(id)

  })

  test("Deve retornar erro ao tentar criar sem email", async ({ client }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.post(BASE_URL+"/users").json({
      password: "12345678",
      role: "user"
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(422)
  })

  test('Deve alterar um usuário', async ({ client }) => {
    const createdUser = await createUser()
    const adminToken = await getAdminToken(client)

    const response = await client.put(BASE_URL+"/users/"+createdUser.id).json({
      email: "user-teste8@betalent.com",
      password: "123456789",
      role: "finance"
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(200)

    response.assertBodyContains({ user: {
      id: createdUser.id,
      email: "user-teste8@betalent.com",
      role: "finance"
    } })

    await deleteUser(createdUser.id)

  })

  test("Deve retornar um usuário", async ({ client }) => {
      const createdUser = await createUser()
      const adminToken = await getAdminToken(client)
  
      const response = await client.get(BASE_URL+'/users/'+createdUser.id).header('Authorization', 'Bearer '+adminToken)
  
      response.assertStatus(200)
      response.assertBodyContains({ user: { id: createdUser.id } })
      await deleteUser(createdUser.id)
    })

    test("Deve deletar um usuário", async ({ client }) => {
        const createdUser = await createUser()
        const adminToken = await getAdminToken(client)
    
        const response = await client.delete(BASE_URL+'/users/'+createdUser.id).header('Authorization', 'Bearer '+adminToken)
    
        response.assertStatus(204)
        await deleteUser(createdUser.id)
      })
  
})