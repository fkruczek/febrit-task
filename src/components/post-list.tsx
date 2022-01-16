import VisuallyHidden from "@reach/visually-hidden"
import { Link } from "react-router-dom"
import { PostListElement as PostListElementType } from "../types"
import { RightArrow, TrashCan } from "./vectors"

function RemoveButton() {
  return (
    <button type="button" title="Remove post">
      <TrashCan />
      <VisuallyHidden>Remove post</VisuallyHidden>
    </button>
  )
}

function PostListElement({ post }: { post: PostListElementType }) {
  return (
    <div className="border-2 border-black p-4 flex">
      <RemoveButton />
      <Link
        to={`${post.id}`}
        className="grid grid-flow-col justify-between w-full ml-4"
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
