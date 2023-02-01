import React from 'react'

type Props = {
  icon: string,
  text: string,
  path: string,
  navigate: Function
}

export default function NavBarBtn({ icon, text, path, navigate }: Props) {
  return (
    <div className='h-full flex-1 flex justify-center items-center'>
      <div className='h-4/5 w-[90%] max-s:h-2/3 hover:w-full transition-all cursor-pointer flex' role='navigation' onClick={() => {navigate(path)}}>
        <div className='max-xs:hidden bg-[url(../public/images/item-frame.png)] bg-contain max-h-full aspect-square flex justify-center items-center'>
          <img src={icon} className='h-3/4' />
        </div>
        <div className='flex-grow bg-[url(../public/images/darker-plank.png)] bg-contain bg-center grid place-items-center text-center max-sm:text-xs'>
          {text}
        </div>
      </div>
    </div>
  )
}
