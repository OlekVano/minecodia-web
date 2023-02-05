import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserProfile } from '../types'
import { fetchUserById } from '../utils'

type Props = {
  loading:  boolean,
  user: User | null | undefined
}

export default function RequireSignInAndProfile({ user, loading }: Props) {
  const [fetching, setFetching] = useState(true)
  const [profile, setProfile] = useState<UserProfile>()

  useEffect(() => {
    if (!user) return
    fetchUserById(user.uid, user).then(json => {
      setProfile(json)
      setFetching(false)
    })
  }, [])

  return (
    <>
      {
        // If not authenticated
        !loading && !user ? <Navigate to='/sign-in' />
        // If user profile not found
        : !fetching && !profile ? <Navigate to='/edit-profile' />
        // If user profile was found or still fetching
        : <></>
      }
    </>
  )
}
