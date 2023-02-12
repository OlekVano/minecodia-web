import { ChangeEventHandler } from 'react'

type Props = {
    onChangeFunc?: ChangeEventHandler<HTMLInputElement>,
    id: string,
    value: string
}

export default function TextInput({ onChangeFunc=function() {}, id, value }: Props) {
  return (
    <input id={id} type='text' className='bg-opacity-50 w-full p-2 bg-black border-2 border-gray-300 outline-none' onChange={onChangeFunc} value={value} />
  )
}
