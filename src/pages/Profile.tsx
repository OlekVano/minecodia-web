import { useEffect, useRef } from 'react'
import { NameTagObject, SkinViewer } from 'skinview3d'
import { IdleAnimation } from 'skinview3d/libs/animation'

import ASScroll from '@ashthornton/asscroll'

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

  useEffect(() => {
    if (loading) return

    const asscroll = new ASScroll()
    asscroll.enable()
    return () => {
      asscroll.disable()
    }
  }, [loading])

  return (
    <div>
      <div className='fixed overflow-x-hidden h-screen w-full'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      <div id='skin-container' className='fixed w-full h-[30vh] s:h-[50vh] md:h-screen md:w-1/2 md:right-0 pointer-events-none grid place-items-center bg-[url("../public/images/house-interior.webp")] bg-cover bg-bottom z-10'>
        <canvas id='skin'></canvas>
      </div>
      <div asscroll-container='true'>
        <div className='p-5 md:w-1/2'>
          <div className='mt-[30vh] s:mt-[50vh] md:mt-0'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum voluptatem eum quae iusto doloremque, tempora perspiciatis vitae facilis repudiandae cupiditate ullam atque eligendi sequi temporibus odio! Tenetur aperiam voluptate nisi harum provident labore voluptas architecto necessitatibus vitae assumenda sed temporibus, voluptatibus quis fugiat reiciendis incidunt ex ducimus ipsa aut omnis vel cum velit non. Dignissimos nostrum, nulla quia dolor nisi nemo, maiores, minima iure asperiores accusantium ea repellendus? Voluptatum sapiente labore dolorem nam debitis non recusandae ipsum eius fuga necessitatibus provident aliquid iste quibusdam, odio deserunt illo! Animi odio ducimus illo aperiam, fugit consectetur ipsam cum, rem, blanditiis quidem adipisci.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas esse repudiandae unde molestias illo nesciunt facere ratione quis amet distinctio autem, recusandae accusantium. Velit minus repellendus possimus illum consequatur vel ipsum error maiores. Dolorum quis enim, quae ullam nulla earum deleniti, iure architecto vitae eius eaque perspiciatis possimus quod corrupti.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cumque quaerat iure provident! Officiis, labore, corporis aut illo ut a nam optio quam esse, necessitatibus vitae doloremque facilis cum. Explicabo, velit? Iusto architecto quis fugiat facere ex cum illum, possimus corrupti laboriosam officia pariatur nemo! Quia commodi tenetur voluptatibus voluptate blanditiis nobis. Earum mollitia provident est, sit officiis magni cupiditate fugit veritatis, excepturi delectus ea odio velit dicta asperiores, reprehenderit fugiat? Laborum doloribus impedit sequi autem, inventore fuga natus accusantium deleniti, dolorem deserunt, id voluptatum sed laboriosam expedita perferendis. Ea, soluta. Porro eos dolorum optio cupiditate, quis rerum numquam fuga.
          </div>
        </div>
      </div>
    </div>
  )
}