import SmoothScroll from '../components/SmoothScroll'
import { User as AuthUser } from 'firebase/auth'
import { Navigate, NavigateFunction, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { MutableRefObject, useEffect, useState } from 'react'
import { UserProfile } from '../types'
import { fetchUserById } from '../utils'
import ASScroll from '@ashthornton/asscroll'
import Button from '../components/Button'
import Button2 from '../components/Button2'
import RequireSignInAndProfile from '../components/RequireSignInAndProfile'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function ProfilePage({ loading, user, navigate, asscrollRef }: Props) {
  const { userId } = useParams()

  const [visible, setVisible] = useState(false)
  const [profile, setProfile] = useState<UserProfile | undefined>()
  const [fetching, setFetching] = useState(true)
  const [reported, setReported] = useState(false)
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  useEffect(function makeVisible() {
    if (!fetching && !loading) setVisible(true)
  }, [fetching, loading])

  useEffect(() => {
    if (user) fetchProfile()
  }, [user])

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
      {
      profile ?
      <div className={`h-full transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
        <div className='fixed top-12 z-[-1] w-full h-[40vh] md:h-full md:w-1/2 md:right-0'>
          <div className='w-full h-full'>
            <Avatar background={profile.background} skin={profile.skin} nickname={profile.nickname} />
          </div>
        </div>
        <div className='max-md:pt-[40vh] h-full md:w-1/2'>
          <div className='flex flex-col p-5 h-full gap-y-8'>
            <div className='md:mt-0 break-words whitespace-pre-line z-[-2]'>
              {profile.description.trim()}
            </div>
            <div className='w-full mt-auto flex flex-col items-center'>
              <div className='flex w-full h-12'>
                <Button2 highlight={liked} icon='/images/diamond.webp' text={`${likes} Likes`} func={handleLikeButton} />
                <Button2 highlight={reported} icon='/images/barrier.webp' text={reported ? 'Reported' : 'Report'} func={() => setReported(!reported)} />
              </div>
              {
                user?.uid === userId ?
                <div className='py-5 w-full flex justify-center'>
                  <Button text='Edit Profile' func={() => navigate('/edit-profile')} />
                </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
      : !profile && !fetching && user?.uid === userId ?
      <Navigate to='/edit-profile' />
      : !profile && !fetching ?
      <div className='grid place-items-center w-screen h-full opacity-100'>
        <div className='z-10 text-3xl'>
          User not found
        </div>
      </div>
      : null
      }

    </>
  )

  // *************************

  async function fetchProfile() {
    const profile = await fetchUserById(userId as string, user as AuthUser)
    setProfile(profile)
    if (profile) {
      setLiked(profile.liked)
      setLikes(profile.likes)
    }
    setFetching(false)
  }

  async function handleLikeButton() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/like/${userId}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
    })

    if (res.status === 200) {
      if (liked) setLikes(likes - 1)
      else setLikes(likes + 1)
      setLiked(!liked)
    }
  }
}