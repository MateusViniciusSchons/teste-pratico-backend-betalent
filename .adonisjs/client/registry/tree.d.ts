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
}
