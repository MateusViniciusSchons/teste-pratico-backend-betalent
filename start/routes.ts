import ClientsController from '#controllers/clients_controller'
import ProductsController from '#controllers/products_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import("#controllers/auth_controller")

router
  .group(() => {
    router
      .group(() => {
        router.post('login', [AuthController, 'login'])
        
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        //Users
        router.post('users', [UsersController, 'create']).use(middleware.role(['admin']))
        router.get('users', [UsersController, 'index']).use(middleware.role(['admin']))
        router.get('users/:id', [UsersController, 'show']).use(middleware.role(['admin']))
        router.put('users/:id', [UsersController, 'update']).use(middleware.role(['admin']))
        router.delete('users/:id', [UsersController, 'delete']).use(middleware.role(['admin']))

        //Products
        router.post('products', [ProductsController, 'create']).use(middleware.role(['admin', 'manager']))
        router.get('products', [ProductsController, 'index']).use(middleware.role(['admin', 'manager']))
        router.get('products/:id', [ProductsController, 'show']).use(middleware.role(['admin', 'manager']))
        router.put('products/:id', [ProductsController, 'update']).use(middleware.role(['admin', 'manager']))
        router.delete('products/:id', [ProductsController, 'delete']).use(middleware.role(['admin', 'manager']))

        //Clients
        router.get('clients', [ClientsController, 'index']).use(middleware.role(['admin', 'manager', 'user']))
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
