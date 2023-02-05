import SmoothScroll from '../components/SmoothScroll'
import { User as AuthUser } from 'firebase/auth'
import { Navigate, NavigateFunction, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { MutableRefObject, useEffect, useState } from 'react'
import { UserProfile } from '../types'
import { fetchUserById } from '../utils'
import ASScroll from '@ashthornton/asscroll'
import { Button } from '../components/Button'
import Button2 from '../components/Button2'
import RequireSignInAndProfile from '../components/RequireSignInAndProfile'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  redirrectToSignIn: Function,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function ProfilePage({ loading, user, navigate, redirrectToSignIn, asscrollRef }: Props) {
  const { userId } = useParams()
  const [profile, setProfile] = useState<UserProfile | undefined>()
  const [fetching, setFetching] = useState(true)
  const [reported, setReported] = useState(false)
  const [liked, setLiked] = useState(false)

  async function fetchProfile() {
    const profile = await fetchUserById(userId as string, user as AuthUser)
    setProfile(profile)
    setFetching(false)
  }

  useEffect(() => {
    if (loading) return
    fetchProfile()
  }, [loading])

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
      <div className='fixed overflow-x-hidden h-screen w-full -z-50'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      {
      profile ?
      <div className={`transition-duration-opacity-1 delay-1000 ${loading ? 'opacity-0' : ''}`}>
        <div className='fixed w-full h-[50vh] md:h-screen md:w-1/2 md:right-0 z-10'>
          <div className='w-full h-full pt-12'>
            <Avatar background={profile.background} skin={profile.skin} nickname={profile.nickname} />
          </div>
        </div>
        <SmoothScroll loading={loading} asscrollRef={asscrollRef}>
          <div className='p-5 md:w-1/2 min-h-screen flex flex-col'>
            <div className='mt-[50vh] md:pt-12 md:mt-0 break-words whitespace-pre-line'>
              {profile.description.trim()}
            </div>
            <div className='w-full mt-auto flex flex-col items-center'>
              <div className='flex w-full h-12'>
                <Button2 highlight={liked} icon='/images/diamond.webp' text={`${888 + (liked ? 1 : 0)} Likes`} func={() => setLiked(!liked)} />
                <Button2 highlight={reported} icon='/images/barrier.webp' text={reported ? 'Reported' : 'Report'} func={() => setReported(!reported)} />
              </div>
              {
                user?.uid === userId ?
                <div className='mt-8'>
                  <Button text='Edit Profile' func={() => navigate('/edit-profile')} />
                </div>
                : null
              }
            </div>
          </div>
        </SmoothScroll>
      </div>
      : !profile && !fetching && user?.uid === userId ?
      <Navigate to='/edit-profile' />
      : !profile && !fetching ?
      <div className='grid place-items-center w-screen h-screen opacity-100'>
        <div className='z-10 text-3xl'>
          User not found
        </div>
      </div>
      : <></>
      }

    </>
  )
}