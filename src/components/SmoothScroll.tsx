import ASScroll from '@ashthornton/asscroll'
import { ReactNode, useEffect } from 'react'

type Props = {
  loading: boolean,
  children: ReactNode
}

export default function SmoothScroll({ loading, children }: Props) {
  useEffect(() => {
    if (loading) return

    const asscroll = new ASScroll({
      
    })
    asscroll.enable()
    return () => {
      asscroll.disable()
    }
  }, [loading])

  return (
    <div asscroll-container='true'>
      {children}
    </div>
  )
}