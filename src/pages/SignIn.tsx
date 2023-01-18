import { useEffect } from "react"

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Button } from "../components/Button";

export default function SignIn({ loading }: any) {
  function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential 

    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
    // // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  return (
    <div className='w-screen h-screen bg-[url("../public/images/dirt-bg.webp")] font-["minecraft"] bg-cover bg-center grid place-items-center'>
      <div className={`gap-10 flex duration-1000 delay-1000 flex-wrap justify-center ${loading ? 'opacity-0' : ''}`}>
        <div className='w-full text-center  text-white' style={{wordSpacing: '3.5px'}}>Signing in allows posting, commenting and having a profile...</div>
        <Button text='Sign In' func={signIn} />
        <Button text='Guest Mode' />
      </div>
    </div>
  )
}
