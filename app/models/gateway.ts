import { GatewaySchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Gateway extends GatewaySchema {
    @column({ isPrimary: true })
    declare id: number
    
    @column()
    declare name: string

    @column()
    declare isActive: boolean

    @column()
    declare priority: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}