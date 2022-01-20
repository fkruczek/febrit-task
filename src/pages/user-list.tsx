import { UserCardList, UserCardListSkeleton } from "../components/user-card"
import { useUsers } from "../utils/user"

function UserList() {
  const { data = { users: { data: [] } }, loading, error } = useUsers()

  if (error) throw new Error(error.message)

  return (
    <div className="grid gap-y-6 gap-x-10 mt-16 grid-cols-user-cards">
      {loading ? (
        <UserCardListSkeleton />
      ) : (
        <UserCardList users={data.users.data} />
      )}
    </div>
  )
}

export { UserList }
