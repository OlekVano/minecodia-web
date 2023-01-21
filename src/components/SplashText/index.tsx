import styles from './index.module.scss'

export default function SplashText({ text }: {text: string}) {
  return (
    <div className={`${styles.main} text-yellow-300 font-["minecraft"] -rotate-[15deg] text-sm`}>{text}</div>
  )
}