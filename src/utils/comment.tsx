import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { PostComment } from "../types"

const GET_ALL = gql`
  query PostDetails($id: ID!) {
    post(id: $id) {
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
  }>(GET_ALL, {
    variables: { id: postId },
  })
}

export { useComments }
