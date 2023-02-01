import { User } from 'firebase/auth'
import React from 'react'
import NavBarBtn from './NavBarBtn'

type Props = {
  user: User | undefined | null,
  navigate: Function
}

export default function NavBar({ user, navigate }: Props) {
  return (
    <div className='fixed w-full h-16 px-5 bg-[url(../public/images/plank.jpg)] bg-contain flex justify-items-stretch items-center z-40'>
      <NavBarBtn navigate={navigate} path='/' text='Home' icon='/images/bookshelf.webp' />
      <NavBarBtn navigate={navigate} path='/explore' text='Explore' icon='/images/sword.webp' />
      <NavBarBtn navigate={navigate} path='/create-post' text='Post' icon='/images/book-and-quill.webp' />
      <NavBarBtn navigate={navigate} path={user?.uid ? `profile/${user.uid}` : '/edit-profile'} text='Profile' icon='/images/armor-stand.webp' />
    </div>
  )
}
