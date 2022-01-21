import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { AddCommentInput, PostComment } from "../types/api-models"

const GET_COMMENTS = gql`
  query PostComments($id: ID!) {
    post(id: $id) {
      id
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`

type GetPostCommentsResponse = {
  post: { id: string; comments: { data: Array<PostComment> } }
}

function useComments() {
  const { postId } = useParams()
  return useQuery<GetPostCommentsResponse>(GET_COMMENTS, {
    variables: { id: postId },
  })
}

const ADD_COMMENT = gql`
  mutation AddComment($name: String!, $email: String!, $body: String!) {
    createComment(input: { name: $name, email: $email, body: $body }) {
      id
      name
      body
      email
    }
  }
`

function useCreateComment() {
  const { postId } = useParams()
  return useMutation<{ createComment: PostComment }, AddCommentInput>(
    ADD_COMMENT,
    {
      refetchQueries: [{ query: GET_COMMENTS, variables: { id: postId } }],
      update(cache, { data }) {
        if (!data) throw new Error("API unexpected behavior")
        if (!postId) throw new Error("Url param missing")
        const cachedData = cache.readQuery<GetPostCommentsResponse>({
          query: GET_COMMENTS,
          variables: { id: postId },
        })
        if (!cachedData) return

        cache.writeQuery<GetPostCommentsResponse>({
          query: GET_COMMENTS,
          variables: { id: postId },
          data: {
            post: {
              id: postId,
              comments: {
                data: [
                  { ...data.createComment },
                  ...cachedData.post.comments.data,
                ],
              },
            },
          },
        })
      },
    }
  )
}

export { useComments, useCreateComment }
