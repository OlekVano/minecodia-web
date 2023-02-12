import { signOut, User } from 'firebase/auth'
import Button2 from './Button2'
import { useLocation } from 'react-router-dom'
import { auth } from '../firebase-setup'

type Props = {
  user: User | undefined | null,
  navigate: Function
}

export default function NavBar({ user, navigate }: Props) {
  const location = useLocation()

  return (
    <div className='fixed w-full h-12 px-5 max-s:px-0 bg-[url(../public/images/plank.jpg)] bg-contain flex justify-items-stretch items-center z-50'>
      {/* <Button2 highlight={location.pathname === '/'} func={() => {navigate('/')}} text='Home' icon='/images/bookshelf.webp' /> */}
      <Button2 highlight={location.pathname === '/explore'} func={navigateToExplorePage} text='Explore' icon='/images/sword.webp' />
      <Button2 highlight={location.pathname === '/create-post'} func={navigateToCreatePostPage} text='Post' icon='/images/book-and-quill.webp' />
      <Button2 highlight={location.pathname === (user?.uid ? `/profile/${user.uid}` : '/edit-profile')} func={navigateToProfile} text='Profile' icon='/images/diamond-helmet.webp' />
      {
        !user ? null : <Button2 highlight={false} func={triggerSignOut} text='Sign Out' icon='/images/door.webp' />
      }
    </div>
  )

  // ************************

  function navigateToExplorePage() {
    navigate('/explore')
  }

  function navigateToCreatePostPage() {
    navigate('/create-post')
  }

  function navigateToProfile() {
    if (user?.uid) navigate(`/profile/${user.uid}`)
    else navigate('/edit-profile')
  }

  function triggerSignOut() {
    signOut(auth)
    navigate('/sign-in')
  }
}
