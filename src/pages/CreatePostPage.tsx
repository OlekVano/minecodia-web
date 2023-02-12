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
  type Post = {
    title: string;
    content: string;
    image: string;
  }

  const [visible, setVisible] = useState(false)

  const [post, setPost] = useState<Post>({
    title: '',
    content: '',
    image: ''
  })

  useEffect(resizeSmoothScroll, [post.image])

  useEffect(function makeVisible() {
    if (!loading) setVisible(true)
  }, [loading])

  const maxTitleLen = 100
  const maxTextLen = 2500
  const maxImageWidth = 2000
  const maxImageHeight = 2000

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
      <SmoothScroll loading={loading} asscrollRef={asscrollRef}>
        <div className={`flex flex-col items-center justify-evenly p-4 pt-16 max-w-2xl mx-auto gap-6 bg-black bg-opacity-50 min-h-screen transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
          <h1 className='text-3xl'>Create a post</h1>
          <div className='w-full flex flex-col items-center gap-2'>
            <label htmlFor='title-input' className='text-xl'>Title</label>
            <TextInput id='title-input' value={post.title} onChangeFunc={manageTitleInputChange} />
          </div>
          {
            post.image ? <img src={post.image} onLoad={resizeSmoothScroll} /> : null
          }
          <div className='w-full flex flex-wrap justify-around items-center gap-2'>
            <Button text='Upload Image' func={triggerImageUpload} />
            <input id='image-upload' onChange={uploadImage} type='file' accept='image/*' className='hidden' />
            {
              post.image ? <Button text='Remove Image' func={removePostImage} />
              : null
            }
          </div>
          <div className='w-full flex flex-col items-center gap-2'>
            <label htmlFor='text-input' className='text-xl'>Content</label>
            <TextAreaInput id='text-input' value={post.content} onChangeFunc={manageTextInputChange} />
          </div>
          <Button text='Post' func={createPost} />
        </div>
      </SmoothScroll>
    </>
  )

  // **************************************

  function setPostImage(image: string) {
    setPost(function  changePostImage(newPost: Post) {
      newPost.image = image
      return newPost
    })
  }

  function setPostTitle(title: string) {
    setPost(function  changePostTitle(newPost: Post) {
      newPost.title = title
      return newPost
    })
  }

  function setPostContent(content: string) {
    setPost(function  changePostTitle(newPost: Post) {
      newPost.content = content
      return newPost
    })
  }

  function resizeSmoothScroll() {
    asscrollRef.current?.resize()
  }

  function removePostImage() {
    setPostImage('')
  }

  function triggerImageUpload() {
    document.getElementById('image-upload')?.click()
  }

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

  async function createPost() {
    if (post.title.trim().length === 0) {
      alert('Title cannot be empty')
      return
    }

    const json = JSON.stringify(post)

    const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
      body: json,
    })

    if (res.status === 200) navigate(`/posts/${(await res.json()).id}`)
    else alert(`Error: ${res.statusText}`) 
  }
}
