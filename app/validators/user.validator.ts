import vine from '@vinejs/vine'
import { RoleEnum } from '../enums/roles.enum.ts'
import { email } from './shared/email.ts'

/**
 * Shared rules for email and password.
 */
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const postUserValidator = vine.create({
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  role: vine.enum(RoleEnum)
})

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
