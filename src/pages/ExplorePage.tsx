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
  loading: boolean,
  navigate: Function
}

export default function ExplorePage({ loading, user, asscrollRef, navigate }: Props) {
  const [visible, setVisible] = useState(false)
  const [posts, setPosts] = useState<(Post & {id: string})[]>([])

  useEffect(function makeVisible() {
    if (posts.length === 0 || loading) return
    setVisible(true)
  }, [posts, loading])

  useEffect(function getPosts() {
    if (!user) return
    fetchPosts(user).then(posts => {
      setPosts(posts)
    })
  }, [user])

  return (
    <>
      <RequireSignInAndProfile loading={loading} user={user} />
        <div className={`max-w-2xl mx-auto flex flex-col transition opacity duration-1000 ${!visible ? 'opacity-0' : ''}`}>
          {
            posts.map((post, i) => {
              return <div key={i}>
                {
                  i === 0 ? null : <div className='w-full h-14 bg-[url(../public/images/cobblestone.jpeg)] bg-contain opacity-80'></div>
                }
                <PostDisplay post={post} asscrollRef={asscrollRef} postId={post.id} user={user} navigate={navigate} />
              </div> 
            })
          }
        </div>
    </>
  )
}
