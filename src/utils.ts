import { Post, UserProfile } from './types'

import { User as AuthUser } from 'firebase/auth'
import { v4 } from 'uuid'

export function getRandNum(max: number): number {
  return Math.floor(Math.random() * max)
}
    
export function getRandArrItem<T>(arr: T[]): T {
  return arr[getRandNum(arr.length)]
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchUserById(id: string, user: AuthUser): Promise<UserProfile | undefined> {
  const token = await user.getIdToken()
  const res = await fetch(`${process.env.REACT_APP_API_URL}/profiles/${id}`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export async function fetchPostById(id: string, user: AuthUser): Promise<Post | undefined> {
  const token = await user.getIdToken()
  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return undefined
  return await res.json()
}

export async function fetchPosts(user: AuthUser): Promise<(Post & {id: string})[]> {
  const token = await user.getIdToken()
  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {headers: new Headers({'Authorization': `Bearer ${token}`})})
  if (res.status !== 200) return []
  const json = await res.json()
  return json
}

export function generateRandomString() {
  return v4()
}