import { AddPostDialog } from "../components/add-post"
import { PostList, PostListSkeleton } from "../components/post-list"
import { UserHeader } from "../components/user-header"
import { useUserPosts } from "../utils/posts"

function User() {
  const {
    data = { user: { posts: { data: [] }, name: null } },
    error,
    loading,
  } = useUserPosts()

  if (error) throw new Error(error.message)

  return (
    <div>
      <UserHeader
        name={data.user.name}
        isLoading={loading}
        navigateBackRoute="/"
      >
        <AddPostDialog />
      </UserHeader>
      {loading ? (
        <PostListSkeleton />
      ) : (
        <PostList posts={data.user.posts.data} />
      )}
    </div>
  )
}

export { User }
