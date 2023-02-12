import ASScroll from '@ashthornton/asscroll'
import { MutableRefObject, ReactNode, useEffect } from 'react'

type Props = {
  loading: boolean,
  children: ReactNode,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function SmoothScroll({ loading, children, asscrollRef }: Props) {
  useEffect(initSmoothScroll, [loading])

  return (
    <div asscroll-container='true' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', contain: 'content'}}>
      <div id='asscroll'>
        {children}
      </div>
    </div>
  )

  // ***************************

  function initSmoothScroll() {
    if (loading) return
    
    // Create a new ASScroll instance if it doesn't yet exist
    if (!asscrollRef.current) {
      asscrollRef.current = new ASScroll()
      asscrollRef.current.enable()
    }
    // Update the existing ASScroll instance to fit the new content
    else {
      asscrollRef.current.enable({
        newScrollElements: document.getElementById('asscroll') as HTMLElement,
        reset: true,
      })
      // Needed in order to fix a bug with a jumping scrollbar
      asscrollRef.current.controller.scrollbar?.transform()
    }
    
    // Cleanup function
    return disableASScroll
  }

  function disableASScroll() {
    asscrollRef.current?.disable()
  }
}