
import SmoothScroll from '../components/SmoothScroll'
import { User as AuthUser } from 'firebase/auth'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { useEffect, useState } from 'react'
import { fetchUserById } from '../utils'
import { Button } from '../components/Button'
import { UserProfile } from '../types'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  redirrectToSignIn: Function
}

export default function EditProfilePage({ loading, user, navigate, redirrectToSignIn }: Props) {
  const [skins, setSkins] = useState<string[]>([])
  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [state, setState] = useState<UserProfile | {}>({})

  function setNickname(value: string): void {
    const newState = {...state}
    newState.nickname = value
    setState(newState)
  }

  function setDescription(value: string): void {
    const newState = {...state}
    newState.description = value
    setState(newState)
  }

  async function setDefaultSkins() {
    fetch(`${process.env.REACT_APP_API_URL}/skins/default`).then(res => res.json()).then(json => setSkins(json))
  }
  
  async function setDefaultBackgrounds() {
    fetch(`${process.env.REACT_APP_API_URL}/backgrounds/default`).then(res => res.json()).then(json => setBackgrounds(json))
  }

  function changeSkin() {
    const newState: UserProfile = {...state} as UserProfile
    const currSkinIndex = skins.indexOf(newState.skin)
    const newSkinIndex = currSkinIndex === skins.length - 1 ? 0 : currSkinIndex + 1
    newState.skin = skins[newSkinIndex]
    setState(newState)
  }

  function changeBackground() {
    const newState: UserProfile = {...state} as UserProfile
    const currBackgroundIndex = backgrounds.indexOf(newState.background)
    const newBackgroundIndex = currBackgroundIndex === backgrounds.length - 1 ? 0 : currBackgroundIndex + 1
    newState.background = backgrounds[newBackgroundIndex]
    setState(newState)
  }

  async function saveChanges() {
    const json = JSON.stringify(state)

    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${user?.uid}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })
  }

  useEffect(() => {
    setDefaultSkins()
    setDefaultBackgrounds()
  }, [])

  useEffect(() => {
    if (!user || skins.length === 0 || backgrounds.length === 0) return
    try {
      fetchUserById(user.uid, user).then(profile => {
        if (profile) setState(profile)
      })
    } finally {

    }
  }, [skins, user])

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
                <input id='nickname-input' type='text' className='w-full p-2 bg-orange-900 border border-orange-800 outline-none' onChange={e => setNickname(e.target.value.trim())} defaultValue={(state as UserProfile).nickname} />
                <Button text='Change Skin' func={changeSkin} />
                <Button text='Change Background' func={changeBackground} />
                <label htmlFor='description-input'>Description</label>
                <textarea id='description-input' className='w-full p-1 bg-orange-900 border border-orange-800 h-[350px] resize-none outline-none' defaultValue={(state as UserProfile).description} onChange={e => setDescription(e.target.value.trim())} />
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
