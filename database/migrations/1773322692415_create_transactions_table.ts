import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client').unsigned().notNullable()
      table.foreign('client').references('id').inTable('clients').onDelete('CASCADE')
      table.integer('gateway').unsigned().notNullable()
      table.foreign('gateway').references('id').inTable('gateways').onDelete('CASCADE')
      table.string('external_id').notNullable()
      table.enum('status', ['pending', 'paid', 'failed']).notNullable().defaultTo('pending')
      table.integer('amount').unsigned().notNullable()
      table.string('card_last_numbers', 4).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}