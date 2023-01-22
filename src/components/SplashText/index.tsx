// Splash Text

import { useEffect, useState } from 'react'
import { getRandArrItem } from '../../utils'
import styles from './index.module.scss'

export default function SplashText() {
  const texts = [
    '99% bug free',
    'Minecraft???',
    'Fanmade',
    'Wake up, coffee, code, faint, repeat'
  ]

  const [text, setText] = useState('')

  useEffect(() => {
    setText(getRandArrItem(texts))
  }, [])

  return (
    <div className={`${styles.main} text-yellow-300 font-["minecraft"] -rotate-[15deg] text-sm text-center`}>{text}</div>
  )
}