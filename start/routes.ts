/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import("#controllers/auth_controller")

router
  .group(() => {
    router
      .group(() => {
        //Login
        router.post('login', [AuthController, 'login'])
        
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.post('users', [UsersController, 'create']).use(middleware.role(['admin']))
        router.get('users', [UsersController, 'index']).use(middleware.role(['admin']))
        router.put('users/:id', [UsersController, 'update']).use(middleware.role(['admin']))
        router.delete('users/:id', [UsersController, 'delete']).use(middleware.role(['admin']))
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
