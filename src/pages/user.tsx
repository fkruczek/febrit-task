import { AddPostDialog } from "../components/dialogs/add-post"
import { FullPageError } from "../components/error"
import { PostList } from "../components/post-list"
import { UserHeader } from "../components/user-header"
import { useUserPosts } from "../utils/posts"

function User() {
  const {
    data = { user: { posts: { data: [] }, name: null } },
    error,
    loading,
  } = useUserPosts()

  if (error) return <FullPageError />

  return (
    <div>
      <UserHeader name={data.user.name} isLoading={loading}>
        <AddPostDialog />
      </UserHeader>
      <PostList posts={data.user.posts.data} />
    </div>
  )
}

export { User }
