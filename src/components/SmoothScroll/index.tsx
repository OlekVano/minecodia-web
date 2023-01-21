import ASScroll from '@ashthornton/asscroll'
import { useEffect } from 'react'

export default function SmoothScroll(props: any) {
  useEffect(() => {
    if (props.loading) return

    const asscroll = new ASScroll()
    asscroll.enable()
    return () => {
      asscroll.disable()
    }
  }, [props.loading])

  return (
    <div asscroll-container='true'>
      {props.children}
    </div>
  )
}
