import { Button } from '../components/Button'
import { auth } from '../firebase-setup'
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { NavigateFunction, useNavigate } from 'react-router-dom'

type Props = {
  loading: boolean,
  user: User | undefined | null,
  navigate: NavigateFunction,
}

export default function SignInPage({ loading, user, navigate }: Props) {
  function signIn() {
    const provider = new GoogleAuthProvider()
    
    signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result)
    //   if (credential == null) return
    //   const token = credential.accessToken
    //   // The signed-in user info.
    //   const user = result.user
    //   // ...
    // })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   // The email of the user's account used.
    //   const email = error.customData.email
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error)
    //   // ...
    // })
  }

  return (
    <div className='w-full h-screen bg-[url("../public/images/dirt-bg.webp")] font-["minecraft"] bg-cover bg-center grid place-items-center'>
      <div className={`gap-10 flex transition-duration-opacity-1 delay-1000 flex-wrap justify-center ${loading ? 'opacity-0' : ''}`}>
        {
          user ?
          <>
            <div className='w-full text-center  text-white' style={{wordSpacing: '3.5px'}}>You are signed in</div>
            <Button text='Explore' func={() => navigate('/explore')} />
            <Button text='Sign Out' func={() => signOut(auth)} />
          </>
          :
          <>
            <div className='w-full text-center  text-white' style={{wordSpacing: '3.5px'}}>Signing in allows posting, commenting and having a profile...</div>
            <Button text='Sign In' func={signIn} />
          </>
        }
      </div>
    </div>
  )
}