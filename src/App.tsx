import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import { auth } from './firebase-setup'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
  const [loading, setLoading] = useState(true)

  const [user] = useAuthState(auth)

  return (
    <div className='App w-full overflow-hidden max-h-screen'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Routes>
        <Route index element={<HomePage loading={loading} />} />
        <Route path='/sign-in' element={<SignInPage loading={loading} user={user} />} />
        <Route path='/profile' element={<ProfilePage loading={loading} />} />
      </Routes>
    </div>
  )
}

export default App