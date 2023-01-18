import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function firstTimeOnWebsite() {
  return localStorage.getItem('visited') == null
}

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(localStorage)
    console.log(localStorage.getItem('visited'))

    const firebaseConfig = {
      apiKey: "AIzaSyAgyTWyf-uON4n-E_m16YEp-ktKuukUQ-4",
      authDomain: "minecodia.firebaseapp.com",
      projectId: "minecodia",
      storageBucket: "minecodia.appspot.com",
      messagingSenderId: "36714364576",
      appId: "1:36714364576:web:f4cce0cd1274f6fdd9d3c5",
      measurementId: "G-F90TGS14GW"
    };

    const app = firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized')
    
    // if (firstTimeOnWebsite()) navigate('/sign-in')
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
