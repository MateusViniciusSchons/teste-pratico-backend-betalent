/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      login: typeof routes['auth.auth.login']
    }
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
}
