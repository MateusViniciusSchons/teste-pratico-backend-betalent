/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
  }
  transactions: {
    create: typeof routes['transactions.create']
    index: typeof routes['transactions.index']
    show: typeof routes['transactions.show']
  }
  users: {
    create: typeof routes['users.create']
    index: typeof routes['users.index']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    delete: typeof routes['users.delete']
  }
  products: {
    create: typeof routes['products.create']
    index: typeof routes['products.index']
    show: typeof routes['products.show']
    update: typeof routes['products.update']
    delete: typeof routes['products.delete']
  }
  clients: {
    index: typeof routes['clients.index']
    showWithTransactions: typeof routes['clients.show_with_transactions']
  }
}
