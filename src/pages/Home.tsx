import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import PanoramaBackground from '../components/PanoramaBackground'
import SplashText from '../components/SplashText'
import { useNavigate } from 'react-router-dom'
import { getRandArrItem } from '../utils'

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
    setSplashText(getRandArrItem(splashTexts))
  }, [])

  return (
    <div>
      <PanoramaBackground bgImage='images/panorama-bg.jpg' />
      <div className={`absolute top-0 left-0 flex flex-col justify-evenly items-center duration-1000 delay-1000 select-none min-h-screen  ${loading ? 'opacity-0': ''}`}>
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
  )
}
