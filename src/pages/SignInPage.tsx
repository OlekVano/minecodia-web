import Button from '../components/Button'
import { auth } from '../firebase-setup'
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth'
import { NavigateFunction } from 'react-router-dom'
import { fetchUserById } from '../utils'
import { MutableRefObject, useEffect, useState } from 'react'
import ASScroll from '@ashthornton/asscroll'

type Props = {
  loading: boolean,
  user: User | undefined | null,
  navigate: NavigateFunction,
  asscrollRef:  MutableRefObject<ASScroll | undefined>
}

export default function SignInPage({ loading, user, navigate, asscrollRef }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(function makeVisible() {
    if (!loading) setVisible(true)
  }, [loading])

  return (
    <div className={`w-full h-full flex justify-center items-center transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
      <div className={`gap-10 flex flex-wrap justify-center p-5 w-full`}>
        {
          user ?
          <>
            <div className='w-full text-center max-xs:text-sm text-white' style={{wordSpacing: '3.5px'}}>You are signed in</div>
            <Button text='Explore' func={function navigateToExplorePage() {navigate('/explore')}} />
            <Button text='Sign Out' func={function triggerSignOut() {signOut(auth)}} />
          </>
          :
          <>
            <div className='w-full text-center max-xs:text-sm text-white' style={{wordSpacing: '3.5px'}}>Only authenticated users can use this application</div>
            <Button text='Sign In' func={signIn} />
          </>
        }
      </div>
    </div>
  )

  // **************************************

  function signIn() {
    const provider = new GoogleAuthProvider()
    
    signInWithPopup(auth, provider)
    .then(async (result) => {
      const userProfile = await fetchUserById((auth.currentUser as User).uid, auth.currentUser as User)
      if (!userProfile) navigate('/edit-profile')
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // if (credential == null) return
      // const token = credential.accessToken
      // // The signed-in user info.
      // const user = result.user
      // ...
    })
    // .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // // The email of the user's account used.
      // const email = error.customData.email
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    // })
  }
}