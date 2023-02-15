import { User as AuthUser } from 'firebase/auth'
import { NavigateFunction } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { MutableRefObject, useEffect, useState } from 'react'
import { fetchUserById } from '../utils'
import Button from '../components/Button'
import { UserProfile } from '../types'
import TextInput from '../components/TextInput'
import TextAreaInput from '../components/TextAreaInput'
import ASScroll from '@ashthornton/asscroll'
import RequireSignIn from '../components/RequireSignIn'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function EditProfilePage({ loading, user, navigate, asscrollRef }: Props) {
  const [visible, setVisible] = useState(false)
  const [skins, setSkins] = useState<string[]>([])
  const [backgrounds, setBackgrounds] = useState<string[]>([])
  const [state, setState] = useState<UserProfile | {}>({})

  const maxNicknameLen = 15
  const maxDescriptionLen = 2500

  useEffect(function makeVisible() {
    if (loading || skins.length === 0 || backgrounds.length === 0 || Object.keys(state).length === 0) return
    setVisible(true)
  }, [loading, skins, backgrounds, state])

  useEffect(function fetchDefaultSkinsAndBackgrounds() {
    fetchDefaultSkins()
    fetchDefaultBackgrounds()
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
      <RequireSignIn loading={loading} user={user} />
      {
        Object.keys(state).length === 0 || loading ? null :
        <div className={`h-full transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
          <div className='fixed top-12 w-full h-[40vh] md:h-full md:w-1/2 md:right-0'>
            <div className='w-full h-full'>
              <Avatar background={(state as UserProfile).background} skin={(state as UserProfile).skin} nickname={(state as UserProfile).nickname} />
            </div>
          </div>
            <div className='max-md:pt-[40vh] h-full md:w-1/2'>
              <div className='flex flex-col gap-4 items-center p-5'>
                <div className='w-full flex flex-col items-center gap-y-6'>
                <label htmlFor='nickname-input'>Nickname</label>
                <TextInput id='nickname-input' value={(state as UserProfile).nickname} onChangeFunc={manageNicknameInputChange} />
                </div>
                <div className='gap-4 flex flex-wrap justify-center max-w-full'>
                  <Button text='Change Skin' func={changeSkin} />
                  <Button text='Upload Skin' func={() => document.getElementById('skin-upload')?.click()} />
                  <input id='skin-upload' onChange={uploadSkin} type='file' className='hidden' />
                  <Button text='Change Background' func={changeBackground} />
                  <Button text='Upload Background' func={() => document.getElementById('background-upload')?.click()} />
                  <input id='background-upload' onChange={uploadBackground} type='file' className='hidden' />
                </div>
                <div className='w-full gap-y-6 flex flex-col items-center'>
                  <label htmlFor='description-input'>Description</label>
                  <TextAreaInput id='description-input' onChangeFunc={manageDescriptionInputChange} value={(state as UserProfile).description} />
                  <Button text='Save' func={saveChanges} />
                </div>
              </div>
            </div>
        </div>
      }
    </>
  )

  // *****************************************

  async function fetchDefaultSkins() {
    fetch(`${process.env.REACT_APP_API_URL}/default/skins`).then(res => res.json()).then(json => setSkins(json))
  }
  
  async function fetchDefaultBackgrounds() {
    fetch(`${process.env.REACT_APP_API_URL}/default/backgrounds`).then(res => res.json()).then(json => setBackgrounds(json))
  }

  function setStateProperty(property: keyof UserProfile, value: string): void {
    const newState: UserProfile = {...state} as UserProfile
    // @ts-ignore
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
        else {
          setSkin(fileReader.result as string)
          e.target.value = '' // Cleaning up the input element
        }
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
        // if (image.width > maxImageWidth || image.height > maxImageHeight) {
        //   alert(`Bad background size: ${image.width}x${image.height}\nBackgrounds must be at maximum ${maxImageWidth}x${maxImageHeight} pixels`)
        // }
        // else setBackground(fileReader.result as string)
        setBackground(fileReader.result as string)
        e.target.value = '' // Cleaning up the input element
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }

  function manageDescriptionInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > maxDescriptionLen) alert(`Description can only contain up to ${maxDescriptionLen} characters`)
    else setDescription(e.target.value)
  }

  function manageNicknameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nickname = e.target.value.trim()
    if (nickname.length > maxNicknameLen) alert(`Nickname can only contain up to ${maxNicknameLen} characters`)
    else setNickname(nickname)
  }

  async function saveChanges() {
    if ((state as UserProfile).nickname.trim().length === 0) {
      alert('Nickname cannot be empty')
      return
    }

    const json = JSON.stringify(state)

    const res = await fetch(`${process.env.REACT_APP_API_URL}/profiles/${user?.uid}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) navigate(`/profile/${user?.uid}`)
    else alert(`Error: ${res.statusText}`)
  }
}
