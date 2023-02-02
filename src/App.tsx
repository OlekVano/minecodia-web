import { useEffect, useRef, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import CreatePostPage from './pages/CreatePostPage'
import { auth } from './firebase-setup'
import { useAuthState } from 'react-firebase-hooks/auth'
import PostPage from './pages/PostPage'
import NavBar from './components/NavBar'

import ASScroll from '@ashthornton/asscroll'

function App() {
  const [loading, setLoading] = useState(true)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const asscroll = useRef<ASScroll>()

  function redirrectToSignIn() {
    navigate('/sign-in')
  }

  return (
    <div className='App w-full overflow-hidden max-h-screen'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Routes>
        <Route index element={null} />
        <Route path='*' element={<NavBar user={user} navigate={navigate} />} />
      </Routes>
      <Routes>
        <Route index element={<HomePage loading={loading} navigate={navigate} asscroll={asscroll.current} />} />
        <Route path='/sign-in' element={<SignInPage loading={loading} user={user} navigate={navigate} />} />
        <Route path='/profile/:userId' element={<ProfilePage loading={loading} user={user} navigate={navigate} redirrectToSignIn={redirrectToSignIn} asscroll={asscroll.current} />} />
        <Route path='/edit-profile' element={<EditProfilePage loading={loading} user={user} navigate={navigate} asscroll={asscroll.current} />} />
        <Route path='/create-post' element={<CreatePostPage loading={loading} user={user} navigate={navigate} asscroll={asscroll.current} />} />
        <Route path='/posts/:postId' element={<PostPage loading={loading} user={user} navigate={navigate} redirrectToSignIn={redirrectToSignIn} asscroll={asscroll.current} />} />
      </Routes>
    </div>
  )
}

export default App