import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
    async create({  request, response }: HttpContext) {
            const { name, amount } = request.only(['name', 'amount'])
    
            const product = await Product.create({
                name,
                amount
            })
    
            return response.created({
                product: {
                    id: product.id,
                    name: product.name,
                    amount: product.amount,
                },
            })
        }
    
        async index({ response }: HttpContext) {
            const products = await Product.findManyBy('deleted', false)
    
            return response.ok({
                products: products.map(product => ({
                    id: product.id,
                    name: product.name,
                    amount: product.amount,
                })),
            })
        }
    
        async show({ request, response }: HttpContext) {
            const { id: productId } = request.params()
    
            const product = await Product.findByOrFail('id', productId)
    
            return response.ok({
                product: {
                    id: product.id,
                    name: product.name,
                    amount: product.amount
                }
            })
        }
    
        async update({ request, response }: HttpContext) {
            const { id } = request.params()
            const { name, amount } = request.only(['name', 'amount'])
            
            const product = await Product.findOrFail(id)

            await product.merge({
                name, 
                amount, 
            }).save()
    
            return response.noContent()
        }
    
        async delete({ request, response }: HttpContext) {
            const { id } = request.params()
            
            const product = await Product.findOrFail(id)
    
            await product.merge({
                deleted: true
            }).save()
    
            return response.noContent()
        }
}