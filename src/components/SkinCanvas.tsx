import { useEffect, useRef } from 'react'
import { NameTagObject, SkinViewer } from 'skinview3d'
import { IdleAnimation } from 'skinview3d/libs/animation'

export default function SkinCanvas({ containerId }: {containerId: string}) {
  const skin = useRef<SkinViewer | null>(null)

  function initializeSkin() {
    skin.current = new SkinViewer({
      canvas: document.getElementById('skin') as HTMLCanvasElement,
      width: 200,
      height: 200,
      skin: '/images/steve.png'
    });
    skin.current.zoom = 0.75
    skin.current.animation = new IdleAnimation()
    skin.current.animation.speed = 1
    skin.current.nameTag = new NameTagObject("hello", { textStyle: "yellow" });
    skin.current.autoRotate = true
    skin.current.autoRotateSpeed = 2
  }

  function resizeSkin() {
    const skinContainer = document.getElementById(containerId) as HTMLDivElement
    let width: number
    let height: number
    if (skinContainer.clientWidth > skinContainer.clientHeight) {
      height = width = skinContainer.clientHeight - 5
    } else {
      height = width = skinContainer.clientWidth - 5
    }

    skin.current = skin.current as SkinViewer
    skin.current.width = width
    skin.current.height = height
  }

  useEffect(() => {
    initializeSkin()
    resizeSkin()
    window.addEventListener('resize', (event) => {
      resizeSkin()
    })
  }, [])

  return (
    <canvas id='skin'></canvas>
  )
}