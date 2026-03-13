import Gateway from '#models/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {

    async index({ response }: HttpContext) {
        const gateways = await Gateway.all()

        return response.ok({ gateways })
    }

    async toggleActive({ request, response }: HttpContext) {
        const { id, action } = request.params()

        const gateway = await Gateway.findOrFail(id)

        if(!['activate', 'deactivate'].includes(action)) {
            throw new Error('Invalid action. Use "activate" or "deactivate".')
        }

        await gateway.merge({ isActive: action === 'activate' }).save()

        return response.ok({ gateway })
    }
}