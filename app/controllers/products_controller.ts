import Product from '#models/product'
import { idParamValidator } from '#validators/id_param.validator'
import { postProductValidator } from '#validators/product.validator'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ProductsController {
    async create({  request, response }: HttpContext) {
            const { name, amount } = await request.validateUsing(postProductValidator)
    
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
            const { id: productId } = await vine.validate({
                schema: idParamValidator,
                data: request.params(),
            })
    
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
            const { id } = await vine.validate({
                schema: idParamValidator,
                data: request.params(),
            })
            const { name, amount } = await request.validateUsing(postProductValidator)
            
            const product = await Product.findOrFail(id)

            await product.merge({
                name, 
                amount, 
            }).save()
    
            return response.noContent()
        }
    
        async delete({ request, response }: HttpContext) {
            const { id } = await vine.validate({
                schema: idParamValidator,
                data: request.params(),
            })
            
            const product = await Product.findOrFail(id)
    
            await product.merge({
                deleted: true
            }).save()
    
            return response.noContent()
        }
}