import { ADMIN_CREDENTIALS, BASE_URL, USER_CREDENTIALS } from "./credentials.ts"

export async function getAdminToken(client: any) {
  const response = await client.post(BASE_URL+'/auth/login').json(ADMIN_CREDENTIALS)
  return response.body().token
}

export async function getUserToken(client: any) {
  const response = await client.post(BASE_URL+'/auth/login').json(USER_CREDENTIALS)
  return response.body().token
}