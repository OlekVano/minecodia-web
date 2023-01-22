import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import PanoramaBackground from '../components/PanoramaBackground'
import SplashText from '../components/SplashText'
import { useNavigate } from 'react-router-dom'
import { getRandArrItem } from '../utils'

import SmoothScroll from '../components/SmoothScroll'

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
      <SmoothScroll loading={loading}>
        <div className={`flex flex-col justify-evenly items-center select-none transition-duration-opacity-1 min-h-screen delay-1000 ${loading ? 'opacity-0': ''}`}>
          <div className='w-full sm:w-2/3 lg:w-1/2 relative'>
            <img src='/images/logo.png'></img>
            <div className='absolute bottom-1/4 right-0'>
              <SplashText text={splashText} />
            </div>
          </div>
          <h1 className='text-2xl uppercase text-center'>
            The first social media platform designed for Minecraft fans!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ex voluptas ipsa nam cum repellendus ullam, maiores qui illo, culpa deleniti doloremque dolore quis distinctio ipsam doloribus officiis eaque consequuntur aspernatur quos ut atque assumenda accusantium! Nobis excepturi aliquam neque, quis porro dolor quisquam ab dicta animi blanditiis, sapiente veniam?
          </h1>
          <div className='flex justify-center gap-x-16 gap-y-8 w-full flex-wrap p-5'>
            <Button text='Try it' func={() => navigate('/sign-in')} />
            <Button text='Learn more' />
          </div>
        </div>
      </SmoothScroll>
    </div>
  )
}