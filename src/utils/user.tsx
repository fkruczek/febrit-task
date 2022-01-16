import { gql, useQuery } from "@apollo/client"
import { UserListElement } from "../types"

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

export { useUsers }
