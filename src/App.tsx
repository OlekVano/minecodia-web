import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className='App w-full'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <div asscroll-container='true' className='absolute left-0 top-0 max-h-full overflow-y-hidden'>
        {/* All content in the following div */}
        <div>
          <Router>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
