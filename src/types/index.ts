export type PostListElement = {
  id: string
  title: string
}

export type PostDetails = {
  id: string
  body: string
  title: string
  user: {
    name: string
  }
}

export type PostComment = {
  id: string
  name: string
  email: string
  body: string
}

export type UserListElement = {
  id: string
  name: string
  email: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export type AddPostInput = {
  title: string
  body: string
}
