import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className='App w-full'>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <div asscroll-container='true' className='absolute left-0 top-0 max-h-full overflow-y-hidden'>
        {/* All content in the following div */}
        <div>
          Content
        </div>
      </div>
    </div>
  );
}

export default App;
