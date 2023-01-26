import { ChangeEventHandler } from 'react'

type Props = {
    onChangeFunc?: ChangeEventHandler<HTMLTextAreaElement> | undefined,
    id?: string | undefined,
    value?: string | undefined
}

export default function TextAreaInput({ onChangeFunc=()=>{}, id='', value='' }: Props) {
  return (
    <textarea id={id} className='overflow-hidden w-full p-2 bg-opacity-50 bg-black border-2 border-gray-300 h-[350px] resize-none outline-none' onChange={onChangeFunc} value={value} />
  )
}
