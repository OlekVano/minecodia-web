export type UserProfile = {
  nickname: string,
  description: string,
  skin: string,
  background: string
}

export type Post = {
  title: string,
  image: string,
  content: string,
  authorId: string,
  likes: number,
  liked: boolean
}