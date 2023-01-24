import SmoothScroll from '../components/SmoothScroll'
import { User as AuthUser } from 'firebase/auth'
import { NavigateFunction, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useEffect, useState } from 'react'
import { UserProfile } from '../types'
import { fetchUserById } from '../utils'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  redirrectToSignIn: Function
}

export default function ProfilePage({ loading, user, navigate, redirrectToSignIn }: Props) {
  const { userId } = useParams()
  const [profile, setProfile] = useState<UserProfile>()

  async function fetchProfile() {
    const profile = await fetchUserById(userId as string, user as AuthUser)
    setProfile(profile)
  }

  useEffect(() => {
    if (loading) return
    fetchProfile()
  }, [loading])

  return (
    <>
      <div className='fixed overflow-x-hidden h-screen w-full'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      {
      profile ?
      <div className={`transition-duration-opacity-1 delay-1000 ${loading ? 'opacity-0' : ''}`}>
        <div className='fixed w-full h-[30vh] s:h-[50vh] md:h-screen md:w-1/2 md:right-0 z-10'>
          <Avatar background={profile.background} skin={profile.skin} nickname={profile.nickname} />
        </div>
        <SmoothScroll loading={loading}>
        <div className='p-5 md:w-1/2'>
          <div className='mt-[30vh] s:mt-[50vh] md:mt-0'>
            {profile.description}
          </div>
        </div>
        </SmoothScroll>
      </div>
      : <></>
      }

    </>
  )
}