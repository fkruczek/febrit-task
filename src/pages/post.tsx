import { Comments } from "../components/comments"
import { FullPageError } from "../components/error"
import { PostContent, PostContentSkeleton } from "../components/post"
import { UserHeader } from "../components/user-header"
import { usePostDetails } from "../utils/posts"

function Post() {
  const {
    data = {
      post: { id: undefined, title: "", body: "", user: { name: null } },
    },
    loading,
    error,
  } = usePostDetails()
  if (error) return <FullPageError />
  return (
    <>
      <UserHeader name={data.post.user.name} isLoading={loading} />
      {loading ? (
        <PostContentSkeleton />
      ) : (
        <PostContent body={data.post.body} title={data.post.title} />
      )}
      {data.post.id && <Comments />}
    </>
  )
}
export { Post }
