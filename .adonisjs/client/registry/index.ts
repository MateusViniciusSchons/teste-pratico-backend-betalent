/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'transactions.create': {
    methods: ["POST"],
    pattern: '/api/v1/transactions',
    tokens: [{"old":"/api/v1/transactions","type":0,"val":"api","end":""},{"old":"/api/v1/transactions","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transactions.create']['types'],
  },
  'users.create': {
    methods: ["POST"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.create']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.delete': {
    methods: ["DELETE"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.delete']['types'],
  },
  'products.create': {
    methods: ["POST"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.create']['types'],
  },
  'products.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.index']['types'],
  },
  'products.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.show']['types'],
  },
  'products.update': {
    methods: ["PUT"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.update']['types'],
  },
  'products.delete': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.delete']['types'],
  },
  'clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.index']['types'],
  },
  'clients.show_with_transactions': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients/:id/transactions',
    tokens: [{"old":"/api/v1/clients/:id/transactions","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id/transactions","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id/transactions","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id/transactions","type":1,"val":"id","end":""},{"old":"/api/v1/clients/:id/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['clients.show_with_transactions']['types'],
  },
  'transactions.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transactions',
    tokens: [{"old":"/api/v1/transactions","type":0,"val":"api","end":""},{"old":"/api/v1/transactions","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transactions.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
