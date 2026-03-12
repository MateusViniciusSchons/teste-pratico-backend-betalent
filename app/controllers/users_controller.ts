import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async create({  request, response }: HttpContext) {
        const { email, password, role } = request.only(['email', 'password', 'role'])

        const user = await User.create({
            email,
            password,
            role,
        })

        return response.created({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        })
    }

    async index({ response }: HttpContext) {
        const users = await User.findManyBy('deleted', false)

        return response.ok({
            users: users.map(user => ({
                id: user.id,
                email: user.email,
                role: user.role,
            })),
        })
    }

    async show({ request, response }: HttpContext) {
        const { id: userId } = request.params()

        const user = await User.findByOrFail('id', userId)

        return response.ok({
            id: user.id,
            email: user.email,
            role: user.role,
        })
    }

    async update({ request, response }: HttpContext) {
        const { id } = request.params()
        const { email, password, role } = request.only(['email', 'password', 'role'])
        
        const user = await User.findOrFail(id)

        const userWithEmail = await User.findBy('email', email)

        if(userWithEmail && userWithEmail.id !== user.id) {
            return response.badRequest({ message: 'Email already in use' })
        }

        await user.merge({
            email, 
            password, 
            role
        }).save()

        return response.noContent()
    }

    async delete({ request, response }: HttpContext) {
        const { id } = request.params()
        
        const user = await User.findOrFail(id)

        await user.merge({
            deleted: true
        }).save()

        return response.noContent()
    }

}