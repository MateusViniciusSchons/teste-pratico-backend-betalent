import ClientsController from '#controllers/clients_controller'
import GatewaysController from '#controllers/gateways_controller'
import ProductsController from '#controllers/products_controller'
import TransactionsController from '#controllers/transactions_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

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
        router.post('users', [UsersController, 'create']).use(middleware.role(['admin', 'manager']))
        router.get('users', [UsersController, 'index']).use(middleware.role(['admin', 'manager']))
        router.get('users/:id', [UsersController, 'show']).use(middleware.role(['admin', 'manager']))
        router.put('users/:id', [UsersController, 'update']).use(middleware.role(['admin', 'manager']))
        router.delete('users/:id', [UsersController, 'delete']).use(middleware.role(['admin', 'manager']))

        //Products
        router.post('products', [ProductsController, 'create']).use(middleware.role(['admin', 'manager', 'finance']))
        router.get('products', [ProductsController, 'index']).use(middleware.role(['admin', 'manager', 'finance']))
        router.get('products/:id', [ProductsController, 'show']).use(middleware.role(['admin', 'manager', 'finance']))
        router.put('products/:id', [ProductsController, 'update']).use(middleware.role(['admin', 'manager', 'finance']))
        router.delete('products/:id', [ProductsController, 'delete']).use(middleware.role(['admin', 'manager', 'finance']))

        //Clients
        router.get('clients', [ClientsController, 'index']).use(middleware.role(['admin', 'user']))
        router.get('clients/:id/transactions', [ClientsController, 'showWithTransactions']).use(middleware.role(['admin', 'user']))

        //Transactions
        router.get('transactions', [TransactionsController, 'index']).use(middleware.role(['admin', 'user']))
        router.get('transactions/:id', [TransactionsController, 'show']).use(middleware.role(['admin', 'user']))
        router.post('transactions/:id/chargeback', [TransactionsController, 'chargeBack']).use(middleware.role(['admin', 'finance']))

        //Gateways
        router.get('gateways', [GatewaysController, 'index']).use(middleware.role(['admin', 'user']))
        router.patch('gateways/:id', [GatewaysController, 'updatePatch']).use(middleware.role(['admin', 'user']))
        
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
