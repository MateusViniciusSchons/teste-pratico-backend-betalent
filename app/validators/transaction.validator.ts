import vine from '@vinejs/vine'
import { email } from './shared/email.ts'

const productSchemaValidator = vine.object({
    id: vine.number().positive(),
    quantity: vine.number().positive(),
})

export const postTransactionValidator = vine.create({
    clientName: vine.string().minLength(3).maxLength(255),
    clientEmail: email(),
    products: vine.array(productSchemaValidator),
    cardNumber: vine.string().fixedLength(16),
    cvv: vine.string().fixedLength(3),
})