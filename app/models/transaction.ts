import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Client from './client.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import TransactionProduct from './transaction_product.ts'
import Gateway from './gateway.ts'

export default class Transaction extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare amount: number

    @column()
    declare cardLastNumbers: string

    @column()
    declare clientId: number

    @belongsTo(() => Client)
    declare client: BelongsTo<typeof Client>

    @column()
    declare externalId: string
    
    @column()
    declare gatewayId: number
    
    @belongsTo(() => Gateway)
    declare gateway: BelongsTo<typeof Gateway>
    
    @column()
    declare status: string

    @hasMany(() => TransactionProduct)
    declare products: HasMany<typeof TransactionProduct>

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}