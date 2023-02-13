// Panorama Background

import styles from './index.module.scss'

type Props = {
  bgImage: string
}

export default function PanoramaBackground({ bgImage }: Props) {
  return (
    <div className='fixed h-screen overflow-x-hidden max-w-full -z-50'>
      <div className={`${styles.main} aspect-[8/1] h-full block bg-contain bg-repeat-x`} style={{backgroundImage: `url(${bgImage})`}}>
      </div>
    </div>
  )
}