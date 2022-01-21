import { gql, useMutation, useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import { AddPostInput, PostDetails, PostListElement } from "../types/api-models"

export const GET_USER_POSTS = gql`
  query UserPostList($id: ID!) {
    user(id: $id) {
      id
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

export type GetUserPostsResponse = {
  user: {
    id: string | null
    posts: { data: Array<PostListElement> }
    name: string
  }
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
      id
      title
      body
      user {
        id
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
  const { userId } = useParams()
  return useMutation<{ createPost: PostListElement }, AddPostInput>(ADD_POST, {
    refetchQueries: [{ query: GET_USER_POSTS, variables: { id: userId } }],
    update(cache, { data }) {
      if (!data) throw new Error("API unexpected behavior")
      const cachedData = cache.readQuery<GetUserPostsResponse>({
        query: GET_USER_POSTS,
        variables: { id: userId },
      })

      if (!cachedData) return

      cache.writeQuery<GetUserPostsResponse>({
        query: GET_USER_POSTS,
        variables: { id: userId },
        data: {
          user: {
            id: userId ?? null,
            name: cachedData.user.name,
            posts: {
              data: [data.createPost, ...cachedData.user.posts.data],
            },
          },
        },
      })
    },
  })
}

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

function useDeletePost(postId: string = "") {
  const { userId } = useParams()
  const navigate = useNavigate()
  return useMutation<{ deletePost: string }, { id: string }>(DELETE_POST, {
    variables: { id: postId },
    refetchQueries: [{ query: GET_USER_POSTS, variables: { id: userId } }],
    onError() {
      window.alert("Error while deleting post...")
    },
    onCompleted() {
      navigate(`/user/${userId}`)
    },
    update(cache, { data }) {
      if (!data) throw new Error("API unexpected behavior")
      const cachedData = cache.readQuery<GetUserPostsResponse>({
        query: GET_USER_POSTS,
        variables: { id: userId },
      })

      if (!cachedData) return

      // TODO: get lodash function or better way to update cache
      cache.writeQuery<GetUserPostsResponse>({
        query: GET_USER_POSTS,
        variables: { id: userId },
        data: {
          ...cachedData,
          user: {
            ...cachedData.user,
            posts: {
              ...cachedData.user.posts,
              data: cachedData.user.posts.data.filter(
                (post) => post.id !== postId
              ),
            },
          },
        },
      })
    },
  })
}

export { useUserPosts, usePostDetails, useCreatePost, useDeletePost }
