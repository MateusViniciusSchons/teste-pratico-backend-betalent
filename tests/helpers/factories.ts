import Gateway from "#models/gateway";
import Product from "#models/product";

export async function createProduct(overrides = {}) {
  return Product.create({
    name: 'Produto Teste',
    amount: 10000,
    ...overrides
  })
}

export async function createGateway(overrides = {}) {
    const last = await Gateway.query().orderBy('priority', 'desc').first()
    return Gateway.create({
        isActive: true,
        name: "GatewayTeste",
        priority: last?.priority? last.priority + 1: 9000,
        ...overrides
    })
}