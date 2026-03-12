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

    
}