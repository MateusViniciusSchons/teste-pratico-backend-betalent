import { BASE_URL } from '#tests/helpers/credentials'
import { createGateway, createProduct } from '#tests/helpers/factories'
import { getAdminToken } from '#tests/helpers/getTokens'
import { test } from '@japa/runner'

test.group('Transactions', () => {
  test('Deve criar uma transação com sucesso', async ({ client }) => {
    const product = await createProduct()

    const response = await client.post(BASE_URL+"/transactions")
    .json({
      clientName: "Cliente Teste",
      clientEmail: "cliente@teste.com",
      cardNumber: "1111111111111111",
      cvv: '123',
      products: [
        {
          id: product.id,
          quantity: 1,
        }
      ]
    })

    response.assertStatus(200)
    response.assertBodyContains({ transaction: { status: 'paid' } })

    await product.delete();
  })

  test('Deve passar para o segundo gateway', async ({ client }) => {
    const product = await createProduct()

    const response = await client.post(BASE_URL+"/transactions")
    .json({
      clientName: "Cliente Teste",
      clientEmail: "cliente@teste.com",
      cardNumber: "1111111111111111",
      cvv: '100',
      products: [
        {
          id: product.id,
          quantity: 1,
        }
      ]
    })

    response.assertStatus(200)
    response.assertBodyContains({ transaction: { status: 'paid', gatewayId: 2 } })

    await product.delete();
  })

  test('Deve dar erro no pagamento', async ({ client }) => {
    const product = await createProduct()

    const response = await client.post(BASE_URL+"/transactions")
    .json({
      clientName: "Cliente Teste",
      clientEmail: "cliente@teste.com",
      cardNumber: "1111111111111111",
      cvv: '200',
      products: [
        {
          id: product.id,
          quantity: 1,
        }
      ]
    })

    response.assertStatus(400)
    response.assertBodyContains({ transaction: { status: 'failed'} })

    await product.delete();
  })

  test('Deve criar e extornar o pagamento', async ({ client }) => {
    const adminToken = await getAdminToken(client)
    const product = await createProduct()

    const response = await client.post(BASE_URL+"/transactions")
    .json({
      clientName: "Cliente Teste",
      clientEmail: "cliente@teste.com",
      cardNumber: "1111111111111111",
      cvv: '124',
      products: [
        {
          id: product.id,
          quantity: 1,
        }
      ]
    })

    const body = response.body() as { transaction: { id: number } }

    const responseChargeBack = await client.post(BASE_URL+"/transactions/"+body.transaction.id+"/chargeback")
      .header('Authorization', 'Bearer '+adminToken)

    responseChargeBack.assertStatus(200)

    await product.delete();
  })
})