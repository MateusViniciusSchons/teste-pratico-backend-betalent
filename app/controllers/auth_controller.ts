 import User from '#models/user'
import { loginValidator } from '#validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({request, response}: HttpContext) {
        const { email, password } = await request.validateUsing(loginValidator)

        try {
            const user = await User.verifyCredentials(email, password)
            const token = await User.accessTokens.create(user)
    
            return response.ok({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                token: token.value!.release(),
            })
        } catch(e) {
            return response.unauthorized({message: 'Credenciais inválidas'})
        }
    }
}