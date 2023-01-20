import { useEffect, useRef } from 'react'
import { NameTagObject, SkinViewer, WalkingAnimation } from 'skinview3d';
import { FlyingAnimation, IdleAnimation } from 'skinview3d/libs/animation';

export default function Profile({ loading }: {loading: boolean}) {
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
    const skinContainer = document.getElementById('skin-container') as HTMLDivElement
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
    <div className='w-full min-h-screen flex flex-col md:flex-row-reverse bg-[url("../public/images/dirt-bg.webp")] bg-no-repeat bg-cover overflow-x-hidden'>
      <div id='skin-container' className='fixed w-full h-[30vh] s:h-[50vh] md:h-screen md:w-1/2 pointer-events-none grid place-items-center bg-[url("../public/images/house-interior.webp")] bg-cover bg-bottom'>
        <canvas id='skin'></canvas>
      </div>
      <div className='w-full h-1/2 mt-[30vh] s:mt-[50vh] md:w-1/2 md:left-0 md:mt-0 absolute'>
        <div className='p-5'>
          <div>Name</div>
          <div>
            Descriptions Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum impedit fugit, voluptates quidem aliquid nemo id quam, soluta excepturi suscipit recusandae magnam necessitatibus est dolores? Omnis laboriosam quasi quae, velit doloribus, fugit ea ipsam cumque accusamus libero repellat inventore ipsum.
          </div>
        </div>
      </div>
    </div>
  )
}
