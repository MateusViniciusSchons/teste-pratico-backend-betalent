import User from '#models/user'
import { idParamValidator } from '#validators/id_param.validator'
import { postUserValidator } from '#validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UsersController {
    async create({  request, response }: HttpContext) {
        const { email, password, role } = await request.validateUsing(postUserValidator)

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
        const { id: userId } = await vine.validate({
            schema: idParamValidator,
            data: request.params(),
        })

        const user = await User.findByOrFail('id', userId)

        return response.ok({
            user: {

                id: user.id,
                email: user.email,
                role: user.role,
            }
        })
    }

    async update({ request, response }: HttpContext) {
        const { id } = await vine.validate({
            schema: idParamValidator,
            data: request.params(),
        })
        const { email, password, role } = await request.validateUsing(postUserValidator)
        
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

        return response.ok({
            user
        })
    }

    async delete({ request, response }: HttpContext) {
        const { id } = await vine.validate({
            schema: idParamValidator,
            data: request.params(),
        })
        
        const user = await User.findOrFail(id)

        await user.merge({
            deleted: true
        }).save()

        return response.noContent()
    }

}