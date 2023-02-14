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
import ExplorePage from './pages/ExplorePage'

import ASScroll from '@ashthornton/asscroll'
import PanoramaBackground from './components/PanoramaBackground'
import DirtBackground from './components/DirtBackground'

function App() {
  const [loading, setLoading] = useState(true)
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const asscrollRef = useRef<ASScroll>()

  return (
    <div className='h-full'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Routes>
        <Route index element={<PanoramaBackground bgImage='/images/panorama-bg.jpg' />} />
        <Route path='*' element={<DirtBackground />} />
      </Routes>
      <div className='h-full flex flex-col'>
        <Routes>
          <Route index element={null} />
          { /* Hiden the navbar on the /sign-in page */}
          <Route path='/sign-in' element={null} />
          <Route path='*' element={<NavBar user={user} navigate={navigate} />} />
        </Routes>
        <div id='scrollable-container' className='flex-grow overflow-y-auto overflow-x-hidden'>
          <Routes>
            <Route index element={<HomePage loading={loading} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/sign-in' element={<SignInPage loading={loading} user={user} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/profile/:userId' element={<ProfilePage loading={loading} user={user} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/edit-profile' element={<EditProfilePage loading={loading} user={user} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/create-post' element={<CreatePostPage loading={loading} user={user} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/posts/:postId' element={<PostPage loading={loading} user={user} navigate={navigate} asscrollRef={asscrollRef} />} />
            <Route path='/explore' element={<ExplorePage loading={loading} user={user} asscrollRef={asscrollRef} navigate={navigate} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App