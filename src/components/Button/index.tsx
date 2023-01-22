// Button

import styles from './index.module.scss'

export const Button = ({ text='', func=()=>{} }: {text?: string, func?: Function}) => {
  return (
    <div role='button' className={styles.main} onClick={() => {new Audio('sounds/click.mp3').play(); func()}}>
      <div className={styles.textWrapper}>
        <div className={styles.text}>
          {text}
        </div>
      </div>
    </div>
  )
}