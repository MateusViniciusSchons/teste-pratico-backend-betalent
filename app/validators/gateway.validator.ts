import vine from '@vinejs/vine'

export const PatchGatewayValidator = vine.create({
    isActive: vine.boolean().optional(),
    priority: vine.number().positive().optional(),
})