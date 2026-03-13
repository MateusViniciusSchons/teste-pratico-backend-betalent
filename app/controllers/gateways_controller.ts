import Gateway from '#models/gateway'
import { PatchGatewayValidator } from '#validators/gateway.validator'
import { idParamValidator } from '#validators/id_param.validator'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class GatewaysController {

    async index({ response }: HttpContext) {
        const gateways = await Gateway.all()

        return response.ok({ gateways })
    }

    async updatePatch({ request, response }: HttpContext) {
        const { id } = await vine.validate({
            schema: idParamValidator,
            data: request.params(),
        })
        const { isActive, priority } = await request.validateUsing(PatchGatewayValidator)

        const gateway = await Gateway.findOrFail(id)

        if(priority !== gateway.priority) {
            const anotherGatewayWithSamePriority = await Gateway.findBy('priority', priority)
            
            if(anotherGatewayWithSamePriority) return response.conflict({ message: 'Not able to change gateway priority, another gatway has the selected priority.'})
        }

        await gateway.merge({ isActive, priority }).save()

        return response.ok({ gateway })
    }
}