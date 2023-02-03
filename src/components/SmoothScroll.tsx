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
      asscrollRef.current = new ASScroll()
      asscrollRef.current.enable()
    }
    else {
      asscrollRef.current.enable({
        newScrollElements: document.getElementById('asscroll') as HTMLElement,
        reset: true,
      })
      // Needed in order to fix a bug with a jumping scrollbar
      asscrollRef.current.controller.scrollbar.transform()
    }

    console.log(asscrollRef.current?.controller)
    
    return () => {
      asscrollRef.current?.disable()
      console.log('disable')
    }
  }, [loading])

  return (
    //style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', contain: 'content'}}
    <div asscroll-container='true' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', contain: 'content'}}>
      <div id='asscroll'>
        {children}
      </div>
    </div>
  )
}