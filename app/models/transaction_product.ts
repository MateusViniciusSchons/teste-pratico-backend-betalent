import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Transaction from './transaction.ts'
import Product from './product.ts'

export default class TransactionProduct extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare productId: number

    @belongsTo(() => Product)
    declare product: BelongsTo<typeof Product>

    @column()
    declare quantity: number

    @column()
    declare transactionId: number

    @belongsTo(() => Transaction)
    declare transaction: BelongsTo<typeof Transaction>

    @column()
    declare unitPrice: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}