import Client from '#models/client'
import Gateway from '#models/gateway'
import Product from '#models/product'
import Transaction from '#models/transaction'
import TransactionProduct from '#models/transaction_product'
import { GatewayService } from '#services/gateways/gateway.service'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
    async create({ request, response }: HttpContext) {
        const { clientName, clientEmail, products, cardNumber, cvv } = request.only(['clientName', 'clientEmail', 'products', 'cardNumber', 'cvv'])

        let totalAmount = 0
        for(const product of products) {
            const productDB = await Product.findByOrFail('id', product.id)
            if(productDB && !productDB.deleted) {
                totalAmount += (productDB.amount * product.quantity)
            } else {
                return response.badRequest({ message: `Product with id ${product.id} not found or deleted` })
            }
        }


        let client = await Client.findBy('email', clientEmail)

        if(!client) {
            client = await Client.create({
                name: clientName,
                email: clientEmail
            })
        }

        if(client.name !== clientName) {
            throw new Error('Client email already exists with a different name')
        }

        const transaction = await Transaction.create({
            amount: totalAmount,
            cardLastNumbers: cardNumber.slice(-4),
            clientId: client.id,
        })

        const transactionProducts = await TransactionProduct.createMany(products.map((product: any) => ({
            productId: product.id,
            quantity: product.quantity,
            transactionId: transaction.id
        })))

        const gateways = await Gateway
            .query()
            .where('isActive', true)
            .orderBy('priority', 'asc')
        
        if(gateways.length === 0) {
            return response.badRequest({ message: 'No active gateways available' })
        }

        for(const gateway of gateways) {
            try {
                console.log(`Processing transaction with gateway ${gateway.name}`)

                const paymentResponse = await GatewayService.processPayment(gateway.name, {
                    name: clientName,
                    email: clientEmail,
                    amount: totalAmount,
                    cardNumber: cardNumber,
                    cvv: cvv
                })

                console.log(paymentResponse)

                if(paymentResponse.id) {
                    
                    await transaction.merge({
                        externalId: paymentResponse.id,
                        gatewayId: gateway.id,
                        status: 'paid'
                    }).save()

                    return response.ok({ message: 'Transaction successful', transaction })
                }

                else {
                    await transaction.merge({
                        gatewayId: gateway.id,
                    }).save()
                }
                
            } catch (error) {
                await transaction.merge({
                    gatewayId: gateway.id,
                }).save()

                console.error(`Error processing transaction with gateway ${gateway.name}:`, error)
            }
        }

        await transaction.merge({
            status: 'failed'
        }).save()

        return response.badRequest({ message: 'Failed to process transaction with available gateways', transaction: {
            ...transaction,
            products: transactionProducts,
        } })

    }
}