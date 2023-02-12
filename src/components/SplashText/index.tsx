// Splash Text

import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { getRandArrItem } from '../../utils'

export default function SplashText() {
  const [text, setText] = useState('')

  useEffect(setRandomSplashText, [])

  const texts = [
    '99% bug free',
    'Minecraft???',
    'Fanmade',
    'Wake up, coffee, code, faint, repeat'
  ]

  return (
    <div className={`${styles.main} text-yellow-300 font-["minecraft"] -rotate-[15deg] text-sm text-center`}>{text}</div>
  )

  // ********************************

  function setRandomSplashText() {
    setText(getRandArrItem(texts))
  }
}