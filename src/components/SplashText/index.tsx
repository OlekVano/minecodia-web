// Splash Text

import styles from './index.module.scss'

type Props = {
  text: string
}

export default function SplashText({ text }: Props) {
  return (
    <div className={`${styles.main} text-yellow-300 font-["minecraft"] -rotate-[15deg] text-sm`}>{text}</div>
  )
}