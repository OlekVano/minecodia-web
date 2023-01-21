import ASScroll from '@ashthornton/asscroll'
import { ReactNode, useEffect } from 'react'

export default function SmoothScroll({ loading, children }: {loading: boolean, children: ReactNode}) {
  useEffect(() => {
    if (loading) return

    const asscroll = new ASScroll()
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
