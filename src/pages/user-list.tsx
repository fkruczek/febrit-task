import { Link } from "react-router-dom"
import { useUsers } from "../utils/user"

function UserList() {
  const { data, loading, error } = useUsers()
  if (loading) return <p>Loading...</p>
  if (error || !data) return <p>Error :(</p>
  return (
    <div>
      {data.users.data.map(({ id, name }) => (
        <div key={id}>
          <Link to={`/user/${id}`}>{name}</Link>
        </div>
      ))}
    </div>
  )
}

export { UserList }
