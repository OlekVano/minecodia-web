import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import PanoramaBackground from '../components/PanoramaBackground'
import SplashText from '../components/SplashText'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { getRandArrItem } from '../utils'

import SmoothScroll from '../components/SmoothScroll'

type Props = {
  loading: boolean,
  navigate: NavigateFunction
}

export default function HomePage({ loading, navigate }: Props) {
  return (
    <>
      <PanoramaBackground bgImage='images/panorama-bg.jpg' />
      <SmoothScroll loading={loading}>
        <div className={`flex flex-col justify-evenly items-center transition-duration-opacity-1 min-h-screen delay-1000 ${loading ? 'opacity-0': ''}`}>
          <div className='w-full sm:w-2/3 lg:w-1/2 relative select-none'>
            <img src='/images/logo.png'></img>
            <div className='absolute bottom-1/4 right-0'>
              <SplashText />
            </div>
          </div>
          <h1 className='text-2xl uppercase text-center'>
            The first social media platform designed for Minecraft fans!
          </h1>
          <div className='flex justify-center gap-x-16 gap-y-8 w-full flex-wrap p-5'>
            <Button text='Try it' func={() => navigate('/sign-in')} />
            <Button text='Learn more' />
          </div>
        </div>
      </SmoothScroll>
    </>
  )
}