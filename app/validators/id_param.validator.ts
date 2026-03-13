import vine from '@vinejs/vine'

export const idParamValidator = vine.object({
    id: vine.number().positive()
})