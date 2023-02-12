import SkinCanvas from './SkinCanvas'
import { useState } from 'react'
import { generateRandomString } from '../utils'

type Props = {
  background: string,
  skin: string,
  nickname: string
}

export default function Avatar({ background, skin, nickname }: Props) {
  const [containerId] = useState(`avatar-container-${generateRandomString()}`)

  return (
    <div id={containerId} style={{backgroundImage: `url(${background})`}} className={`transition-[background] duration-500 pointer-events-none bg-cover bg-center w-full h-full min-w-full min-h-full grid place-items-center`}>
      <SkinCanvas nickname={nickname} containerId={containerId} skinImg={skin}  />
    </div>
  )
}
