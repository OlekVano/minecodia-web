import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
  }, [])

  return (
    <div className='App w-full overflow-hidden max-h-screen'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Routes>
        <Route index element={<Home loading={loading} />} />
        <Route path='/sign-in' element={<SignIn loading={loading} />} />
      </Routes>
    </div>
  );
}

export default App;
