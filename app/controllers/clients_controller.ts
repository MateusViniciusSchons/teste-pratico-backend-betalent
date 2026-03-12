import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
    async index({ response }: HttpContext) {
        const clients = await Client.all()
        return response.ok({ clients })
    }
}