import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'users.create': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}