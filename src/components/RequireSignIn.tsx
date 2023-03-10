import { User } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

type Props = {
  loading:  boolean,
  user: User | null | undefined
}

export default function RequireSignIn({ user, loading }: Props) {
  // If not signed in
  if (!user && !loading) return <Navigate to='/sign-in' />
  return null
}
