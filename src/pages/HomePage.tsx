import Button from '../components/Button'
import PanoramaBackground from '../components/PanoramaBackground'
import SplashText from '../components/SplashText'
import { NavigateFunction, } from 'react-router-dom'
import SmoothScroll from '../components/SmoothScroll'
import ASScroll from '@ashthornton/asscroll'
import { MutableRefObject, useEffect, useState } from 'react'

type Props = {
  loading: boolean,
  navigate: NavigateFunction,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function HomePage({ loading, navigate, asscrollRef }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(function makeVisible() {
    if (!loading) setVisible(true)
  }, [loading])

  return (
    <div className={`flex flex-col justify-evenly items-center min-h-full transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
      <div className='w-full sm:w-2/3 lg:w-1/2 relative select-none'>
        <img alt='' src='/images/logo.png'></img>
        <div className='absolute bottom-1/4 right-0'>
          <SplashText />
        </div>
      </div>
      <h1 className='max-xs:text-lg text-2xl uppercase text-center'>
        The first social media platform designed for Minecraft fans!
      </h1>
      <div className='flex justify-center gap-x-16 gap-y-8 w-full flex-wrap p-5'>
        <Button text='Try it' func={() => navigate('/sign-in')} />
        <Button text='Learn more' />
      </div>
    </div>
  )
}