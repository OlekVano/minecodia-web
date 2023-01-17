// LoadingScreen

import styles from './index.module.scss'

import { useEffect, useState } from 'react'
import { sleep } from '../../utils'

import ASScroll from '@ashthornton/asscroll'

const statuses: string[] = [
  'Getting compilation errors',
  'Pasting the error message in Google search',
  'Copying code from StackOverflow',
  'Compilation successful'
]

export default function LoadingScreen({ loading, setLoading }: { loading: boolean, setLoading: Function }) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    (async () => {
      for (let status of statuses) {
        setStatus(status)
        await sleep(500)
        for (let n of Array(3)) {
          setStatus(status => status + '.')
          await sleep(500)
        }
      }
      setLoading(false)
      
      const asscroll = new ASScroll()
      asscroll.enable()

      new Audio('sounds/pop.mp3').play()
      await sleep(1000)
      new Audio('sounds/orb.mp3').play()
    })()
  }, [])


  return (
    <div className={`bg-[#ef303f] z-50 absolute top-0 left-0 w-full h-screen duration-1000 select-none ${!loading ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className='w-full h-full flex flex-col justify-center items-center text-white '>
        <div className='text-7xl font-["mojangStudios"] uppercase'>web dev</div>
        <div className='text-2xl font-["round"] tracking-[10px] uppercase font-black'>studios</div>
        <div className='text-xs mt-10 font-["round"]'>{status}</div>
        <div className='h-4 w-1/2 mt-2'>
          <div className={`${styles.loadingBar} bg-white h-full`}></div>
        </div>
      </div>
    </div>
  )
}