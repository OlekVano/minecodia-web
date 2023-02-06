import ASScroll from '@ashthornton/asscroll'
import { User } from 'firebase/auth'
import { MutableRefObject, useEffect, useState } from 'react'
import PostDisplay from '../components/PostDisplay'
import RequireSignInAndProfile from '../components/RequireSignInAndProfile'
import SmoothScroll from '../components/SmoothScroll'
import { Post } from '../types'
import { fetchPosts } from '../utils'

type Props = {
  user: User | undefined | null,
  asscrollRef: MutableRefObject<ASScroll | undefined>,
  loading: boolean
}

export default function ExplorePage({ loading, user, asscrollRef }: Props) {
  const [posts, setPosts] = useState<(Post & {id: string})[]>([])

  useEffect(() => {
    if (!user || loading) return
    fetchPosts(user).then(posts => {
      console.log(posts)
      setPosts(posts)
    })
  }, [loading])

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
      <div className='fixed overflow-x-hidden h-screen w-full -z-50'>
        <div className='h-screen block bg-cover bg-[url("../public/images/dirt-bg.webp")] bg-center'></div>
      </div>
      <SmoothScroll loading={loading} asscrollRef={asscrollRef} >
        <div className='max-w-2xl mx-auto min-h-[100vh]'>
          {
            posts.map((post, i) => {
              return <PostDisplay post={post} asscrollRef={asscrollRef} postId={post.id} user={user} key={i} />
            })
          }
        </div>
      </SmoothScroll>
    </>
  )
}
