import { Comments } from "../components/comments"
import { UserHeader } from "../components/user-header"
import { usePostDetails } from "../utils/posts"

function Post() {
  const { data, loading, error } = usePostDetails()
  if (loading) return <p>Loading...</p>
  if (error || !data) return <p>Error :(</p>
  return (
    <div>
      <UserHeader name={data.post.user.name} isLoading={loading} />
      <h1>{data.post.title}</h1>
      <p>{data.post.body}</p>
      <Comments />
    </div>
  )
}
export { Post }
