// Button

import styles from './index.module.scss'

type Props = {
  text?: string,
  func?: Function
}

export default function Button ({ text='', func=()=>{} }: Props) {
  function onClick() {
    new Audio('sounds/click.mp3').play()
    func()
  }

  return (
    <div role='button' className={styles.main} onClick={onClick}>
      <div className={styles.textWrapper}>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    </div>
  )
}