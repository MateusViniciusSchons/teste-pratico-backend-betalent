import { ProductSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Product extends ProductSchema {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare amount: number

    @column()
    declare deleted: boolean

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}