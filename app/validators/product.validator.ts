import vine from '@vinejs/vine'

export const postProductValidator = vine.create({
    name: vine.string().minLength(3).maxLength(255),
    amount: vine.number().positive(),
})