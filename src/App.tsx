import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className='App w-full overflow-hidden max-h-screen'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Routes>
        <Route index element={<HomePage loading={loading} />} />
        <Route path='/sign-in' element={<SignInPage loading={loading} />} />
        <Route path='/profile' element={<ProfilePage loading={loading} />} />
      </Routes>
    </div>
  );
}

export default App;