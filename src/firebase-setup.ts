import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAgyTWyf-uON4n-E_m16YEp-ktKuukUQ-4',
    authDomain: 'minecodia.firebaseapp.com',
    projectId: 'minecodia',
    storageBucket: 'minecodia.appspot.com',
    messagingSenderId: '36714364576',
    appId: '1:36714364576:web:f4cce0cd1274f6fdd9d3c5',
    measurementId: 'G-F90TGS14GW'
  }

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)