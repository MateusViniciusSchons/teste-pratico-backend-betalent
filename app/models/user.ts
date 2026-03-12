import { UserSchema } from '#database/schema'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import type { AccessToken } from '@adonisjs/auth/access_tokens'
import { column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder) {

    static accessTokens = DbAccessTokensProvider.forModel(User)
    declare currentAccessToken?: AccessToken

    @column({ isPrimary: true })
    declare id: number

    @column()
    declare email: string
    
    @column({ serializeAs: null })
    declare password: string

    @column()
    declare role: string

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime
}