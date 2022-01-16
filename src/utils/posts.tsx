import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { AddPostInput, PostDetails, PostListElement } from "../types"

const GET_USER_POSTS = gql`
  query UserPostList($id: ID!) {
    user(id: $id) {
      name
      posts {
        data {
          id
          title
        }
      }
    }
  }
`

type GetUserPostsResponse = {
  user: { posts: { data: Array<PostListElement> }; name: string }
}

function useUserPosts() {
  const { userId } = useParams()
  return useQuery<GetUserPostsResponse>(GET_USER_POSTS, {
    variables: { id: userId },
  })
}

const GET_POST_DETAILS = gql`
  query PostDetails($id: ID!) {
    post(id: $id) {
      title
      body
      user {
        name
      }
    }
  }
`

type GetPostDetailsResponse = {
  post: PostDetails
}

function usePostDetails() {
  const { postId } = useParams()
  return useQuery<GetPostDetailsResponse>(GET_POST_DETAILS, {
    variables: { id: postId },
  })
}

const ADD_POST = gql`
  mutation AddPost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`

function useCreatePost() {
  return useMutation<PostListElement, AddPostInput>(ADD_POST)
}

export { useUserPosts, usePostDetails, useCreatePost }
