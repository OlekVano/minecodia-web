import ASScroll from '@ashthornton/asscroll'
import { User } from 'firebase/auth'
import { MutableRefObject, useEffect, useState } from 'react'
import Button from '../components/Button'
import RequireSignInAndProfile from '../components/RequireSignInAndProfile'
import SmoothScroll from '../components/SmoothScroll'
import TextAreaInput from '../components/TextAreaInput'
import TextInput from '../components/TextInput'

type Props = {
  loading: boolean,
  user: User | null | undefined,
  navigate: Function,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function CreatePostPage({ loading, user, navigate, asscrollRef }: Props) {
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postImage, setPostImage] = useState('')

  const maxTitleLen = 100
  const maxTextLen = 2500
  const maxImageWidth = 1000
  const maxImageHeight = 1000

  function manageTitleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    if (title.length > maxTitleLen) alert(`Title can only contain up to ${maxTitleLen} characters`)
    else setPostTitle(title)
  }

  function manageTextInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value
    if (text.length > maxTextLen) alert(`Title can only contain up to ${maxTextLen} characters`)
    else setPostContent(text)
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const image = new Image()
      image.onload = () => {
        if (image.width > maxImageWidth || image.height > maxImageHeight) {
          alert(`Bad image size: ${image.width}x${image.height}\nImages must be at maximum ${maxImageWidth}x${maxImageHeight} pixels`)
        }
        else setPostImage(fileReader.result as string)
      }
      // The line below calls image.onload
      image.src = fileReader.result as string
    }
  }

  async function post() {
    if (postTitle.trim().length === 0) {
      alert('Title cannot be empty')
      return
    }

    const json = JSON.stringify({
      title: postTitle,
      content: postContent,
      image: postImage
    })

    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) navigate(`/posts/${(await res.json()).id}`)
    else alert(`Error: ${res.statusText}`) 
  }

  useEffect(() => {
    asscrollRef.current?.resize()
  }, [postImage])

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
      <div className='fixed overflow-x-hidden h-screen w-full -z-50'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      <SmoothScroll loading={loading} asscrollRef={asscrollRef}>
        <div className='flex flex-col items-center p-4 pt-16 max-w-2xl mx-auto gap-6'>
          <h1 className='text-3xl'>Create a post</h1>
          <div className='w-full flex flex-col items-center gap-2'>
            <label htmlFor='title-input' className='text-xl'>Title</label>
            <TextInput id='title-input' value={postTitle} onChangeFunc={manageTitleInputChange} />
          </div>
          <div className='w-full flex flex-wrap justify-around items-center gap-2'>
            <Button text='Upload Image' func={() => document.getElementById('image-upload')?.click()} />
            <input id='image-upload' onChange={uploadImage} type='file' className='hidden' />
            {
              postImage ? <Button text='Remove Image' func={() => setPostImage('')} />
              : <></>
            }
          </div>
          <div className='w-full flex flex-col items-center gap-2'>
            <label htmlFor='text-input' className='text-xl'>Content</label>
            <TextAreaInput id='text-input' value={postContent} onChangeFunc={manageTextInputChange} />
          </div>
          <Button text='Post' func={post} />
        </div>
      </SmoothScroll>
    </>
  )
}
