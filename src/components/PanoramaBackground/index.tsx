// Panorama Background

import styles from './index.module.scss'

export default function PanoramaBackground({ bgImage }: {bgImage: string}) {
  return (
    <div className='fixed overflow-x-hidden max-w-full'>
      <div className={`${styles.main} aspect-[8/1] h-screen block bg-contain bg-repeat-x`} style={{backgroundImage: `url(${bgImage})`}}>
      </div>
    </div>
  )
}