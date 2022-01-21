import { gql, useApolloClient, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { UserListElement } from "../types/api-models"
import { GetUserPostsResponse, GET_USER_POSTS } from "./posts"

const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        name
        email
        phone
        website
        company {
          name
          catchPhrase
          bs
        }
      }
    }
  }
`

type GetUsersResponse = {
  users: { data: Array<UserListElement> }
}

function useUsers() {
  return useQuery<GetUsersResponse>(GET_USERS)
}

function useNameFromCache() {
  const { userId } = useParams()
  const { cache } = useApolloClient()
  const data = cache.readQuery<GetUserPostsResponse>({
    query: GET_USER_POSTS,
    variables: { id: userId },
  })
  return data?.user?.name ?? null
}
export { useUsers, useNameFromCache }
