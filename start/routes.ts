import ClientsController from '#controllers/clients_controller'
import GatewaysController from '#controllers/gateways_controller'
import ProductsController from '#controllers/products_controller'
import TransactionsController from '#controllers/transactions_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { RoleEnum } from '../app/enums/roles.enum.ts'

const AuthController = () => import("#controllers/auth_controller")

router
  .group(() => {
    router
      .group(() => {
        //Auth
        router.post('auth/login', [AuthController, 'login'])

        //Transactions
        router.post('transactions', [TransactionsController, 'create'])
      })

    router
      .group(() => {
        //Users
        router.post('users', [UsersController, 'create']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER]))
        router.get('users', [UsersController, 'index']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER]))
        router.get('users/:id', [UsersController, 'show']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER]))
        router.put('users/:id', [UsersController, 'update']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER]))
        router.delete('users/:id', [UsersController, 'delete']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER]))

        //Products
        router.post('products', [ProductsController, 'create']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.FINANCE]))
        router.get('products', [ProductsController, 'index']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.FINANCE]))
        router.get('products/:id', [ProductsController, 'show']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.FINANCE]))
        router.put('products/:id', [ProductsController, 'update']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.FINANCE]))
        router.delete('products/:id', [ProductsController, 'delete']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.MANAGER, RoleEnum.FINANCE]))

        //Clients
        router.get('clients', [ClientsController, 'index']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))
        router.get('clients/:id/transactions', [ClientsController, 'showWithTransactions']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))

        //Transactions
        router.get('transactions', [TransactionsController, 'index']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))
        router.get('transactions/:id', [TransactionsController, 'show']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))
        router.post('transactions/:id/chargeback', [TransactionsController, 'chargeBack']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.FINANCE]))

        //Gateways
        router.get('gateways', [GatewaysController, 'index']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))
        router.patch('gateways/:id', [GatewaysController, 'updatePatch']).use(middleware.role([RoleEnum.ADMIN, RoleEnum.USER]))
        
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
