import { MutableRefObject, useEffect, useState } from 'react'
import { NavigateFunction, useParams } from 'react-router-dom'
import { Post } from '../types'
import { User as AuthUser } from 'firebase/auth'
import { fetchPostById } from '../utils'
import SmoothScroll from '../components/SmoothScroll'
import ASScroll from '@ashthornton/asscroll'
import PostDisplay from '../components/PostDisplay'

type Props = {
  loading: boolean,
  user: AuthUser | undefined | null,
  navigate: NavigateFunction,
  asscrollRef: MutableRefObject<ASScroll | undefined>
}

export default function PostPage({ loading, user, navigate, asscrollRef }: Props) {
  const { postId } = useParams()

  const [visible, setVisible] = useState(false)
  const [post, setPost] = useState<Post | undefined>()
  const [fetching, setFetching] = useState(true)
  
  useEffect(() => {
    if (user) fetchPost()
  }, [user])

  useEffect(function makeVisible() {
    if (!loading && !fetching) setVisible(true)
  }, [loading, fetching])

  return (
    <>
      {
      post ?
      <div className={`transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
          <div className='max-w-2xl mx-auto min-h-[100vh] flex'>
            {/* <div className='w-full min-h-full bg-red-700'></div> */}
          <PostDisplay post={post} asscrollRef={asscrollRef} postId={postId as string} user={user} navigate={navigate} />
          </div>
      </div>
      : !post && !fetching ?
      <div className='grid place-items-center w-screen h-full opacity-100'>
        <div className='z-10 text-3xl'>
          Post not found
        </div>
      </div>
      : null
      }
    </>
  )

  // ****************************

  async function fetchPost() {
    const post = await fetchPostById(postId as string, user as AuthUser)
    setPost(post)
    setFetching(false)
  }
}
