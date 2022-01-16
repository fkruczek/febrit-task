import { AddPostDialog } from "../components/dialogs/add-post"
import { PostList } from "../components/post-list"
import { UserHeader } from "../components/user"
import { useUserPosts } from "../utils/posts"

function User() {
  const { data, error, loading } = useUserPosts()

  if (loading) return <span>todo loading</span>

  if (error || !data) return <span>todo error</span>

  if (!data.user.name) return <span>todo NO SUCH USER</span>

  return (
    <div>
      <UserHeader name={data.user.name}>
        <AddPostDialog />
      </UserHeader>
      <PostList posts={data.user.posts.data} />
    </div>
  )
}

export { User }
