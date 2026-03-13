import Gateway from '#models/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {

    async index({ response }: HttpContext) {
        const gateways = await Gateway.all()

        return response.ok({ gateways })
    }

    async updatePatch({ request, response }: HttpContext) {
        const { id } = request.params()
        const { isActive, priority } = request.only(['isActive', 'priority'])

        const gateway = await Gateway.findOrFail(id)

        if(priority !== gateway.priority) {
            const anotherGatewayWithSamePriority = await Gateway.findBy('priority', priority)
            
            if(anotherGatewayWithSamePriority) return response.conflict({ message: 'Not able to change gateway priority, another gatway has the selected priority.'})
        }

        await gateway.merge({ isActive, priority }).save()

        return response.ok({ gateway })
    }
}