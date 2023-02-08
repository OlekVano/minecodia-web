import ASScroll from '@ashthornton/asscroll'
import { User } from 'firebase/auth'
import { MutableRefObject, useState } from 'react'
import { Post } from '../types'
import Button2 from './Button2'

type Props = {
  post: Post,
  asscrollRef: MutableRefObject<ASScroll | undefined>,
  user: User | undefined | null,
  postId: string
}

export default function PostDisplay({ post, asscrollRef, user, postId }: Props) {
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(post.liked)
  const [reported, setReported] = useState(false)

  async function handleLikeButton() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/like/${postId}`, {
      method: 'POST',
      headers: new Headers({'Authorization': `Bearer ${await user?.getIdToken()}`, 'Content-Type': 'application/json'}),
    })

    if (res.status === 200) {
      setLikes(liked ? likes - 1 : likes + 1)
      setLiked(!liked)
    }
  }

  return (
    <div className='p-5 pt-16 flex flex-col justify-evenly gap-8 bg-black bg-opacity-50 w-full min-h-full'>
      <h1 className='text-3xl text-center break-words'>{post.title}</h1>
      {
        post.image ? <div className='w-full px-4'><img alt='' className='w-full' src={post.image} onLoad={() => asscrollRef.current?.resize()} /></div> : <></>
      }
      {
        post.content ? <div className='break-words whitespace-pre-line'>{post.content.trim()}</div> : <></>
      }
      <div className='flex w-full h-12'>
        <Button2 highlight={liked} icon='/images/diamond.webp' text={`${likes} Likes`} func={handleLikeButton} />
        <Button2 highlight={reported} icon='/images/barrier.webp' text={reported ? 'Reported' : 'Report'} func={() => setReported(!reported)} />
      </div>
    </div>
  )
}