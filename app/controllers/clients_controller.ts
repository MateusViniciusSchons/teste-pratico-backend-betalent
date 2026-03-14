import Client from '#models/client'
import { idParamValidator } from '#validators/id_param.validator'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ClientsController {
    async index({ response }: HttpContext) {
        const clients = await Client.all()
        return response.ok({ clients })
    }

    async showWithTransactions({ request, response }: HttpContext) {
        const { id } = await vine.validate({
            schema: idParamValidator,
            data: request.params(),
        })

        const client = await Client.query().where('id', id).preload('transactions', (transactionsQuery) => {
            transactionsQuery.preload('products', (productQuery) => {
              productQuery.preload('product')
            })
        }).firstOrFail()

        response.ok({ client })
    }
}
