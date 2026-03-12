import { TransactionSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Transaction extends TransactionSchema {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare amount: number

    @column()
    declare cardLastNumbers: string

    @column()
    declare client: number

    @column()
    declare externalId: string
    
    @column()
    declare gateway: number
    
    @column()
    declare status: string
    
    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}