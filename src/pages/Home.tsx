import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import PanoramaBackground from '../components/PanoramaBackground'
import SplashText from '../components/SplashText'
import { useNavigate } from 'react-router-dom'
import { getRandArrItem } from '../utils'

import ASScroll from '@ashthornton/asscroll'

export default function Home({ loading }: {loading: boolean}) {
  const navigate = useNavigate()

  const splashTexts = [
    '99% bug free',
    'Minecraft???',
    'Fanmade',
    'Wake up, coffee, code, faint, repeat',
  ]

  const [splashText, setSplashText] = useState('')

  useEffect(() => {
    if (loading) return
    setSplashText(getRandArrItem(splashTexts))

    const asscroll = new ASScroll()
    asscroll.enable()
    return () => {
      asscroll.disable()
    }
  }, [loading])

  return (
    <div>
      <PanoramaBackground bgImage='images/panorama-bg.jpg' />
      <div asscroll-container='true' className='absolute top-0 left-0'>
        <div>
        <div className={`flex flex-col justify-evenly items-center select-none min-h-screen ${loading ? 'opacity-0 hidden': ''}`}>
          <div className='w-full sm:w-2/3 lg:w-1/2 h-full relative'>
            <img src='/images/logo.png'></img>
            <div className='absolute bottom-1/4 right-0'>
              <SplashText text={splashText} />
            </div>
          </div>
          <h1 className='text-2xl uppercase text-center'>
            The first social media platform designed for Minecraft fans!
          </h1>
          <div className='flex justify-center gap-x-16 gap-y-8 w-full max-w-2xl flex-wrap'>
            <Button text='Try it' func={() => navigate('/sign-in')} />
            <Button text='Learn more' />
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
