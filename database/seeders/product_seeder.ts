import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Fraldas Pampers 56 unidades',
        amount: 7710,
      },
      {
        name: 'Leite ninho fases 1-3 anos',
        amount: 4490,
      },
      {
        name: 'Camisa infantil tamanho 2',
        amount: 3990,
      },
      {
        name: 'Calçao infantil tamanho 2',
        amount: 3790,
      }
    ])
  }
}