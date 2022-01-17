import VisuallyHidden from "@reach/visually-hidden"
import { Link } from "react-router-dom"
import { PostListElement as PostListElementType } from "../types"
import { useDeletePost } from "../utils/posts"
import { RightArrow, Spinner, TrashCan } from "./vectors"

function RemoveButton({
  onDelete,
  isLoading,
}: {
  onDelete: () => unknown
  isLoading: boolean
}) {
  return (
    <button
      type="button"
      title="Remove post"
      className="pl-4 fill-indigo-700 hover:fill-yellow-500 focus:outline-none focus:fill-yellow-500"
      onClick={onDelete}
    >
      {isLoading ? <Spinner /> : <TrashCan />}
      <VisuallyHidden>Remove post</VisuallyHidden>
    </button>
  )
}

function PostListElement({ post }: { post: PostListElementType }) {
  const [deletePost, { loading }] = useDeletePost(post.id)

  return (
    <div className="border-2 border-black flex">
      <RemoveButton onDelete={deletePost} isLoading={loading} />
      <Link
        to={`${post.id}`}
        className="grid grid-flow-col justify-between w-full p-4 ml-4 fill-indigo-700 hover:fill-yellow-500 focus:outline-none focus:fill-yellow-500"
      >
        <span className="truncate mr-4">{post.title}</span>
        <RightArrow />
      </Link>
    </div>
  )
}

function PostList({ posts }: { posts: PostListElementType[] }) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostListElement key={post.id} post={post} />
      ))}
    </div>
  )
}

export { PostList }
