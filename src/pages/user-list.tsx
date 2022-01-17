import { UserCard, UserCardListSkeleton } from "../components/user-card"
import { useUsers } from "../utils/user"
import { FullPageError } from "../components/error"

function UserList() {
  const { data = { users: { data: [] } }, loading, error } = useUsers()
  if (error) return <FullPageError />
  return (
    <div className="grid gap-y-6 gap-x-10 mt-16 grid-cols-user-cards">
      {loading ? (
        <UserCardListSkeleton />
      ) : (
        data.users.data.map((userDetails) => (
          <UserCard key={userDetails.id} {...userDetails} />
        ))
      )}
    </div>
  )
}

export { UserList }
