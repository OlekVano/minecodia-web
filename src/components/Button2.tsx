import { MouseEventHandler } from 'react'

type Props = {
  icon?: string,
  text?: string,
  func?: Function,
  highlight?: boolean
}

export default function Button2({ icon='', text='', func=function() {}, highlight=false }: Props) {
  return (
    <div className='h-full flex-1 flex justify-center items-center select-none'>
      <div className={`h-4/5 w-[90%] max-s:h-2/3 hover:w-full transition-[width] cursor-pointer flex ${highlight ? 'outline-yellow-400 outline outline-2' : ''}`} role='navigation' onClick={func as MouseEventHandler}>
        <div style={{backgroundImage: highlight ? 'url(/images/glowing-item-frame.png)' : 'url(/images/item-frame.png)'}} className={`max-400:hidden bg-contain max-h-full aspect-square flex justify-center items-center`}>
          <img src={icon} alt='' className='h-2/3' />
        </div>
        <div className={`flex-grow bg-[url(../public/images/darker-plank.png)] bg-contain bg-center grid place-items-center text-center max-sm:text-xs ${highlight ? 'text-yellow-400' : ''}`}>
          {text}
        </div>
      </div>
    </div>
  )
}