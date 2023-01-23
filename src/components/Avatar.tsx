import SkinCanvas from './SkinCanvas'

type Props = {
  background: string,
  skin: string,
  nickname: string
}

export default function Avatar({ background, skin, nickname }: Props) {
  return (
    <div id='skin-container' style={{backgroundImage: `url(${background})`}} className={`pointer-events-none bg-cover bg-bottom w-full h-full grid place-items-center`}>
      <SkinCanvas nickname={nickname} containerId='skin-container' skinImg={skin}  />
    </div>
  )
}
