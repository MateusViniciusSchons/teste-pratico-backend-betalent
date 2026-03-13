import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
    async index({ response }: HttpContext) {
        const clients = await Client.all()
        return response.ok({ clients })
    }

    async showWithTransactions({ request, response }: HttpContext) {
        const { id } = request.params()

        const client = await Client.query().where('id', id).preload('transactions', (transactionsQuery) => {
            transactionsQuery.preload('products')
        }).firstOrFail()

        response.ok({ client })
    }
}