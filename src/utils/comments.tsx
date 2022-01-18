import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { PostComment } from "../types/api-models"

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
function useComments() {
  const { postId } = useParams()
  return useQuery<{
    post: { comments: { data: Array<PostComment> } }
  }>(GET_COMMENTS, {
    variables: { id: postId },
  })
}

export { useComments }
