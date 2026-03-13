import Product from "#models/product";

export async function createProduct(overrides = {}) {
  return Product.create({
    name: 'Produto Teste',
    amount: 10000,
    ...overrides
  })
}