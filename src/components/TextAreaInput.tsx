import { ChangeEventHandler } from 'react'

type Props = {
    onChangeFunc?: ChangeEventHandler<HTMLTextAreaElement>,
    id?: string,
    value?: string
}

export default function TextAreaInput({ onChangeFunc=function() {}, id='', value='' }: Props) {
  return (
    <textarea id={id} className='asscroll-block w-full p-2 bg-opacity-50 bg-black border-2 border-gray-300 h-[350px] resize-none outline-none' onChange={onChangeFunc} value={value} />
  )
}
