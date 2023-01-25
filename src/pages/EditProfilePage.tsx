import SmoothScroll from '../components/SmoothScroll'
import { User as AuthUser } from 'firebase/auth'
import { NavigateFunction } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useEffect, useState } from 'react'
import { fetchUserById } from '../utils'
import { Button } from '../components/Button'
import { UserProfile } from '../types'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
}

export default function EditProfilePage({ loading, user, navigate }: Props) {
  const [skins, setSkins] = useState<string[]>([])
  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [state, setState] = useState<UserProfile | {}>({})

  async function setDefaultSkins() {
    fetch(`${process.env.REACT_APP_API_URL}/skins/default`).then(res => res.json()).then(json => setSkins(json))
  }
  
  async function setDefaultBackgrounds() {
    fetch(`${process.env.REACT_APP_API_URL}/backgrounds/default`).then(res => res.json()).then(json => setBackgrounds(json))
  }

  function setStateProperty(property: keyof UserProfile, value: string): void {
    const newState: UserProfile = {...state} as UserProfile
    newState[property] = value
    setState(newState)
  }

  function setNickname(value: string): void {
    setStateProperty('nickname', value)
  }

  function setDescription(value: string): void {
    setStateProperty('description', value)
  }

  function setSkin(value: string): void {
    setStateProperty('skin', value)
  }

  function setBackground(value: string): void {
    setStateProperty('background', value)
  }

  function changeSkin() {
    const currSkinIndex = skins.indexOf((state as UserProfile).skin)
    const newSkinIndex = currSkinIndex === skins.length - 1 ? 0 : currSkinIndex + 1
    setSkin(skins[newSkinIndex])
  }

  function changeBackground() {
    const currBackgroundIndex = backgrounds.indexOf((state as UserProfile).background)
    const newBackgroundIndex = currBackgroundIndex === backgrounds.length - 1 ? 0 : currBackgroundIndex + 1
    setBackground(backgrounds[newBackgroundIndex])
  }

  function uploadSkin(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        if (image.width !== 64 || image.height !== 64) {
          alert(`Bad skin size: ${image.width}x${image.height}\nSkins must be 64x64 pixels`)
        }
        else setSkin(fileReader.result as string)
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }

  function uploadBackground(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        if (image.width > 1000 || image.height > 1000) {
          alert(`Bad background size: ${image.width}x${image.height}\nBackgrounds must be at maximum 1000x1000 pixels`)
        }
        else setBackground(fileReader.result as string)
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }
  async function saveChanges() {
    const json = JSON.stringify(state)

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${user?.uid}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) navigate(`/profile/${user?.uid}`)
    else alert(`Error: ${res.statusText}`)
  }

  useEffect(() => {
    setDefaultSkins()
    setDefaultBackgrounds()
  }, [])

  useEffect(() => {
    if (!user || skins.length === 0 || backgrounds.length === 0) return
    fetchUserById(user.uid, user).then(profile => {
      if (profile) setState(profile)
      else setState({
        background: backgrounds[0],
        skin: skins[0],
        description: '',
        nickname: ''
      })
    })
  }, [skins, user, backgrounds])

  return (
    <>
      <div className='fixed overflow-x-hidden h-screen w-full'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      {
        Object.keys(state).length === 0 ? <></> :
        <div className={`transition-duration-opacity-1 delay-1000 ${loading ? 'opacity-0' : ''}`}>
          <div className='fixed w-full h-[30vh] s:h-[50vh] md:h-screen md:w-1/2 md:right-0 z-10'>
            <Avatar background={(state as UserProfile).background} skin={(state as UserProfile).skin} nickname={(state as UserProfile).nickname} />
          </div>
          <SmoothScroll loading={loading}>
          <div className='p-5 md:w-1/2'>
            <div className='mt-[30vh] s:mt-[50vh] md:mt-0 h-full'>
              <div className='flex flex-col gap-4 items-center'>
                <label htmlFor='nickname-input'>Nickname</label>
                <input id='nickname-input' type='text' className='bg-opacity-50 w-full p-2 bg-black border-2 border-gray-300 outline-none' onChange={e => setNickname(e.target.value.trim())} defaultValue={(state as UserProfile).nickname} />
                <div className='gap-4 flex flex-wrap justify-center max-w-full'>
                  <Button text='Change Skin' func={changeSkin} />
                  <Button text='Upload Skin' func={() => document.getElementById('skin-upload')?.click()} />
                  <input id='skin-upload' onChange={uploadSkin} type='file' className='hidden' />
                  <Button text='Change Background' func={changeBackground} />
                  <Button text='Upload Background' func={() => document.getElementById('background-upload')?.click()} />
                  <input id='background-upload' onChange={uploadBackground} type='file' className='hidden' />
                </div>

                <label htmlFor='description-input'>Description</label>
                <textarea id='description-input' className='w-full p-2 bg-opacity-50 bg-black border-2 border-gray-300 h-[350px] resize-none outline-none' defaultValue={(state as UserProfile).description} onChange={e => setDescription(e.target.value.trim())} />
                <Button text='Save' func={saveChanges} />
              </div>
            </div>
          </div>
          </SmoothScroll>
        </div>
      }
    </>
  )
}
