import { MutableRefObject, useEffect, useState } from 'react'
import { NavigateFunction, useParams } from 'react-router-dom'
import { Post } from '../types'
import { User as AuthUser } from 'firebase/auth'
import { fetchPostById } from '../utils'
import SmoothScroll from '../components/SmoothScroll'
import ASScroll from '@ashthornton/asscroll'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  redirrectToSignIn: Function,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function PostPage({ loading, user, navigate, redirrectToSignIn, asscrollRef }: Props) {
  const { postId } = useParams()
  const [post, setPost] = useState<Post | undefined>()
  const [fetching, setFetching] = useState(true)

  async function fetchPost() {
    const post = await fetchPostById(postId as string, user as AuthUser)
    setPost(post)
    setFetching(false)
  }

  useEffect(() => {
    if (loading) return
    fetchPost()
  }, [loading])

  return (
    <>
      <div className='fixed overflow-x-hidden h-screen w-full -z-50'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      {
      post ?
      <div className={`transition-duration-opacity-1 delay-1000 ${loading ? 'opacity-0' : ''}`}>
        <SmoothScroll loading={loading} asscrollRef={asscrollRef}>
          <div className='max-w-2xl mx-auto bg-black bg-opacity-50 min-h-[100vh]'>
          <div className='p-5 pt-16 flex flex-col gap-8'>
            <h1 className='text-3xl text-center break-words'>{post.title}</h1>
            {
              post.image ? <div className='w-full p-4'><img className='w-full' src={post.image} /></div> : <></>
            }
            <div className='break-words'>
              {post.content}
            </div>
          </div>
          </div>
        </SmoothScroll>
      </div>
      : !post && !fetching ?
      <div className='grid place-items-center w-screen h-screen opacity-100'>
        <div className='z-10 text-3xl'>
          Post not found
        </div>
      </div>
      : <></>
      }
    </>
  )
}
