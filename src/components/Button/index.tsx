// Button

import styles from './index.module.scss'

type Props = {
  text?: string,
  func?: Function
}

export default function Button ({ text='', func=function() {} }: Props) {
  return (
    <div role='button' className={styles.main} onClick={onBtnClick}>
      <div className={styles.textWrapper}>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    </div>
  )

  // ****************************

  function onBtnClick() {
    new Audio('sounds/click.mp3').play()
    func()
  }
}