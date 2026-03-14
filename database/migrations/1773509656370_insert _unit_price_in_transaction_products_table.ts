import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('unit_price')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('unit_price')
    })
  }
}