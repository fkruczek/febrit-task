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

export type Contact = {
  email: string
  phone: string
  website: string
}

export type Company = {
  name: string
  catchPhrase: string
  bs: string
}

export type UserListElement = {
  id: string
  name: string
  company: Company
} & Contact

export type AddPostInput = {
  title: string
  body: string
}
