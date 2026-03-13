import { BASE_URL } from '#tests/helpers/credentials'
import { createProduct } from '#tests/helpers/factories'
import { getAdminToken, getUserToken } from '#tests/helpers/getTokens'
import { test } from '@japa/runner'

test.group('Products', (group) => {

  group.each.setup(async () => {

  })

  test("Deve retornar erro ao acessar sem token", async ({ client }) => {
    const response = await client.get(BASE_URL+'/products')

    response.assertStatus(401)
  })

  test("Deve retornar erro ao acessar con usuário sem acesso", async ({ client }) => {
     const userToken = await getUserToken(client)

    const response = await client.get(BASE_URL+"/products").header('Authorization', 'Bearer '+userToken)

    response.assertStatus(401)
  })
  
  test('Deve retornar um array de produtos pro admin', async ({ client, assert }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.get(BASE_URL+"/products").header('Authorization', 'Bearer '+adminToken)

    const body = response.body() as { products: [] }

    response.assertStatus(200)
    assert.isArray(body.products)
  })

  test("Deve criar um produto", async ({ client }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.post(BASE_URL+'/products').json({
      name: "Produto Teste",
      amount: 10000
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(201)
  })

  test("Deve retornar erro ao tentar criar sem name", async ({ client }) => {
    const adminToken = await getAdminToken(client)

    const response = await client.post(BASE_URL+'/products/').json({
      amount: 10000
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(422)
  })

  test("Deve retornar um produto", async ({ client }) => {
    const createdProduct = await createProduct()
    const adminToken = await getAdminToken(client)

    const response = await client.get(BASE_URL+'/products/'+createdProduct.id).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(200)
    response.assertBodyContains({ product: { id: createdProduct.id } })
  })

  test("Deve alterar um produto", async ({ client }) => {
    const createdProduct = await createProduct()
    const adminToken = await getAdminToken(client)

    const response = await client.put(BASE_URL+'/products/'+createdProduct.id).json({
      ...createdProduct,
      name: "Novo Produto Teste Alterado",
      amount: 33000
    }).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(200)
    response.assertBodyContains({ product: { id: createdProduct.id, name: "Novo Produto Teste Alterado", amount: 33000 } })
  })

  test("Deve deletar um produto", async ({ client }) => {
    const createdProduct = await createProduct()
    const adminToken = await getAdminToken(client)

    const response = await client.delete(BASE_URL+'/products/'+createdProduct.id).header('Authorization', 'Bearer '+adminToken)

    response.assertStatus(204)
  })
})