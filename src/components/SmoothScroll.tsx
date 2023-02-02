import ASScroll from '@ashthornton/asscroll'
import { ReactNode, useEffect } from 'react'

type Props = {
  loading: boolean,
  children: ReactNode,
  asscroll: ASScroll | undefined
}

export default function SmoothScroll({ loading, children, asscroll }: Props) {
  useEffect(() => {
    if (loading) return
    if (!asscroll) {
      asscroll = new ASScroll()
    }
    asscroll.enable()
    return () => {
      asscroll?.disable()
    }
  }, [loading])

  return (
    <div asscroll-container='true'>
      {children}
    </div>
  )
}