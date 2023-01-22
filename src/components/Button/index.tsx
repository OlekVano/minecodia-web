// Button

import styles from './index.module.scss'

type Props = {
  text?: string,
  func?: Function
}

export const Button = ({ text='', func=()=>{} }: Props) => {
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