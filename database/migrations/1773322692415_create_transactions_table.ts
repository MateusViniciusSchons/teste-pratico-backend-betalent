import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().notNullable()
      table.foreign('client_id').references('id').inTable('clients').onDelete('CASCADE')
      table.integer('gateway_id').unsigned().nullable()
      table.foreign('gateway_id').references('id').inTable('gateways').onDelete('CASCADE')
      table.string('external_id').nullable()
      table.enum('status', ['pending', 'paid', 'failed', 'charged_back']).notNullable().defaultTo('pending')
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