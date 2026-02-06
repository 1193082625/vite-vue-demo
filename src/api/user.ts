import type { UserInfo } from '../types/user'
import { get, post } from './request'

export const getUserDetail = (id: number) => {
  return get<UserInfo>(`/api/user/${id}`)
}

export const login = (data: { username: string; password: string }) => {
  return post<{ token: string; userInfo: UserInfo }>(`/api/auth/login`, data)
}

export const logout = () => {
  return post<void>(`/api/auth/logout`)
}
