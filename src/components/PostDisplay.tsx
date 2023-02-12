import ASScroll from '@ashthornton/asscroll'
import { User } from 'firebase/auth'
import { MutableRefObject, useState } from 'react'
import { MutableRefObject, useState } from 'react'
import { Post } from '../types'
import Avatar from './Avatar'
import Button2 from './Button2'

type Props = {
  post: Post,
  asscrollRef: MutableRefObject<ASScroll | undefined>,
  user: User | undefined | null,
  postId: string,
  navigate: Function
}

export default function PostDisplay({ post, asscrollRef, user, postId, navigate }: Props) {
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(post.liked)
  const [reported, setReported] = useState(false)
  const [shared, setShared] = useState(false)

  return (
    <div className='p-5 flex flex-col bg-black bg-opacity-50 w-full min-h-full'>
      <div className='flex'>
        <div className='w-9 h-9 min-w-[36px] min-h-[36px] m:w-14 m:h-14 m:min-h-[56px] m:min-w-[56px] cursor-pointer flex justify-items-stretch items-stretch' onClick={navigateToProfile}>
          <Avatar background={post.author.background} nickname={post.author.nickname} skin={post.author.skin} />
        </div>
        <div className='flex flex-col justify-evenly gap-8 flex-grow'>
          <h3 className='pl-4 cursor-pointer hover:underline w-fit' onClick={navigateToProfile}>{post.author.nickname}</h3>
          <h1 className='text-3xl text-center break-words'>{post.title}</h1>
          {
            !post.image ? null
            : <div className='w-full px-4'><img alt='' className='w-full' src={post.image} onLoad={resizeSmoothScroll} /></div>
          }
          {
            !post.content ? null
            : <div className='break-words whitespace-pre-line'>{post.content.trim()}</div>
          }
        </div>
      </div>
      <div className='flex w-full h-12 mt-5'>
        <Button2 highlight={liked} icon='/images/diamond.webp' text={`${likes} Likes`} func={handleLikeButton} />
        <Button2 highlight={reported} icon='/images/barrier.webp' text={reported ? 'Reported' : 'Report'} func={toggleReported} />
        <Button2 highlight={shared} icon='/images/book.webp' text={shared ? 'Shared' : 'Share'} func={sharePost} />
      </div>
    </div>
  )

  // ******************************

  function toggleReported() {
    setReported(!reported)
  }

  function resizeSmoothScroll() {
    asscrollRef.current?.resize()
  }

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

  function navigateToProfile() {
    navigate(`/profile/${post.authorId}`)
  }

  function sharePost() {
    console.log(window.location)
    navigator.clipboard.writeText(`${window.location.origin}/posts/${post.id}`)
    setShared(true)
  }
}