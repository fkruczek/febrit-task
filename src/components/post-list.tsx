import VisuallyHidden from "@reach/visually-hidden"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { PostListElement as PostListElementType } from "../types/api-models"
import { ContainerProps } from "../types/util"
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

function PostListElementContainer({ children }: ContainerProps) {
  return <div className="border-2 flex">{children}</div>
}

function PostListElement({ post }: { post: PostListElementType }) {
  const [deletePost, { loading }] = useDeletePost(post.id)

  return (
    <PostListElementContainer>
      <RemoveButton onDelete={deletePost} isLoading={loading} />
      <Link
        to={`${post.id}`}
        className="grid grid-flow-col justify-between w-full p-4 ml-4 fill-indigo-700 hover:fill-yellow-500 focus:outline-none focus:fill-yellow-500"
      >
        <span className="truncate mr-4">{post.title}</span>
        <RightArrow />
      </Link>
    </PostListElementContainer>
  )
}

function PostListContainer({ children }: ContainerProps) {
  return <div className="grid gap-4">{children}</div>
}

function PostList({ posts }: { posts: PostListElementType[] }) {
  return (
    <PostListContainer>
      {posts.map((post) => (
        <PostListElement key={post.id} post={post} />
      ))}
    </PostListContainer>
  )
}

function PostListElementSkeleton() {
  return (
    <PostListElementContainer>
      <Skeleton height={20} containerClassName="w-full m-4" />
    </PostListElementContainer>
  )
}

function PostListSkeleton() {
  return (
    <PostListContainer>
      {[...Array(10)].map((_, index) => (
        <PostListElementSkeleton key={index} />
      ))}
    </PostListContainer>
  )
}

export { PostList, PostListSkeleton }
