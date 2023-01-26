import { ChangeEventHandler } from 'react'

type Props = {
    onChangeFunc?: ChangeEventHandler<HTMLInputElement> | undefined,
    id: string,
    value: string
}

export default function TextInput({ onChangeFunc=()=>{}, id, value }: Props) {
  return (
    <input id={id} type='text' className='bg-opacity-50 w-full p-2 bg-black border-2 border-gray-300 outline-none' onChange={onChangeFunc} value={value} />
  )
}
