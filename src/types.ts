export type UserProfile = {
  nickname: string,
  description: string,
  skin: string,
  background: string
}

export type Post = {
  id: string,
  title: string,
  image: string,
  content: string,
  authorId: string,
  likes: number,
  liked: boolean,
  author: UserProfile
}