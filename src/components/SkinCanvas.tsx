import { useEffect, useRef, useState } from 'react'
import { NameTagObject, SkinViewer } from 'skinview3d'
import { IdleAnimation } from 'skinview3d/libs/animation'
import { generateRandomString } from '../utils'

type Props = {
  containerId: string,
  nickname: string,
  skinImg: string
}

export default function SkinCanvas({ containerId, nickname, skinImg }: Props) {
  const [canvasId] = useState(`skin-canvas-${generateRandomString()}`)
  const skin = useRef<SkinViewer | null>(null)

  useEffect(addResizeEventHandler, [])
  useEffect(returnUnmountFunction, [])
  useEffect(initializeCanvas, [skinImg])

  useEffect(function changeNickname() {
    (skin.current as SkinViewer).nameTag = new NameTagObject(nickname, { textStyle: 'yellow' })
  }, [nickname])

  return (
    <canvas id={canvasId}></canvas>
  )

  // ***********************************

  function addResizeEventHandler() {
    window.addEventListener('resize', resizeSkin)
  }

  function returnUnmountFunction() {
    return disposeSkin
  }

  function disposeSkin() {
    skin.current?.dispose()
  }

  function initializeCanvas() {
    initializeSkin()
    resizeSkin()
  }

  function initializeSkin() {
    skin.current = new SkinViewer({
      canvas: document.getElementById(canvasId) as HTMLCanvasElement,
      width: 200,
      height: 200,
      skin: skinImg
    })
    skin.current.zoom = 0.75
    skin.current.animation = new IdleAnimation()
    skin.current.animation.speed = 1
    skin.current.nameTag = new NameTagObject(nickname, { textStyle: 'yellow' })
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

    // if (height < 56) {
    //   height = width = 56
    // }

    skin.current = skin.current as SkinViewer
    skin.current.width = width
    skin.current.height = height
  }
}