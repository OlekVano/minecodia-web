import { User } from 'firebase/auth'
import Button2 from './Button2'
import { useLocation } from 'react-router-dom'

type Props = {
  user: User | undefined | null,
  navigate: Function
}

export default function NavBar({ user, navigate }: Props) {
  const location = useLocation()

  return (
    <div className='fixed w-full h-12 px-5 max-s:px-0 bg-[url(../public/images/plank.jpg)] bg-contain flex justify-items-stretch items-center z-40'>
      <Button2 highlight={location.pathname === '/'} func={() => {navigate('/')}} text='Home' icon='/images/bookshelf.webp' />
      <Button2 highlight={location.pathname === '/explore'} func={() => {navigate('/explore')}} text='Explore' icon='/images/sword.webp' />
      <Button2 highlight={location.pathname === '/create-post'} func={() => {navigate('/create-post')}} text='Post' icon='/images/book-and-quill.webp' />
      <Button2 highlight={location.pathname === (user?.uid ? `/profile/${user.uid}` : '/edit-profile')} func={() => {navigate(user?.uid ? `/profile/${user.uid}` : '/edit-profile')}} text='Profile' icon='/images/diamond-helmet.webp' />
    </div>
  )
}
