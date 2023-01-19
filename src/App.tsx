import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
  }, [])

  return (
    <div className='App w-full'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <div asscroll-container='true' className='absolute left-0 top-0 max-h-full overflow-y-hidden'>
        {/* All content in the following div */}
        <div>
          <Routes>
            <Route index element={<Home loading={loading} />} />
            <Route path='/sign-in' element={<SignIn loading={loading} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
