import { Comments } from "../components/comments"
import {
  PostContent,
  PostContentSkeleton,
  PostHeaderContent,
} from "../components/post"
import { UserHeader } from "../components/user-header"
import { usePostDetails } from "../api/posts"

function Post() {
  const {
    data = {
      id: undefined,
      post: {
        id: undefined,
        title: "",
        body: "",
        user: { id: undefined, name: null },
      },
    },
    loading,
    error,
  } = usePostDetails()

  if (error) throw new Error(error.message)

  return (
    <>
      <UserHeader
        name={data.post.user.name}
        isLoading={loading}
        navigateBackRoute={data.post.user.id && `/user/${data.post.user.id}`}
      >
        <PostHeaderContent />
      </UserHeader>
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
