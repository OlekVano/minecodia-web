import ASScroll from '@ashthornton/asscroll'
import { MutableRefObject, ReactNode, useEffect } from 'react'

type Props = {
  loading: boolean,
  children: ReactNode,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function SmoothScroll({ loading, children, asscrollRef }: Props) {
  useEffect(() => {
    if (loading) return
    if (!asscrollRef.current) {
      console.log('CREATE NEW ASSCROLL')
      asscrollRef.current = new ASScroll()
    }
    asscrollRef.current.enable()
    return () => {
      asscrollRef.current?.disable()
    }
  }, [loading])

  return (
    <div asscroll-container='true'>
      {children}
    </div>
  )
}