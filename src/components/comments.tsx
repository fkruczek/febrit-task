import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { PostComment } from "../types/api-models"
import { ContainerProps } from "../types/util"
import { useComments } from "../utils/comments"
import { Anchor } from "./anchor"
import { LinkButton } from "./buttons"
import { FullPageError } from "./error"

function CommentContainer({ children }: ContainerProps) {
  return <div className="border-2 p-4">{children}</div>
}

function Comment({ name, email, body }: PostComment) {
  return (
    <CommentContainer>
      <div className="sm:flex flex-row-reverse justify-between">
        <Anchor href={`mailto:${email}`}>{email}</Anchor>
        <div className="font-bold mb-4">{name}</div>
      </div>
      <div>{body}</div>
    </CommentContainer>
  )
}

function CommentSkeletons() {
  const skeletonHeights = [40, 30, 60, 80, 50]
  return (
    <>
      {skeletonHeights.map((height) => (
        <CommentContainer key={height}>
          <Skeleton height={height} />
        </CommentContainer>
      ))}
    </>
  )
}

function CommentList() {
  const {
    data = { post: { comments: { data: [] } } },
    loading,
    error,
  } = useComments()
  if (error) return <FullPageError />

  return (
    <div className="grid gap-4">
      {loading ? (
        <CommentSkeletons />
      ) : (
        data.post.comments.data.map((comment) => (
          <Comment {...comment} key={comment.id} />
        ))
      )}
    </div>
  )
}

function Comments() {
  const [showComments, setShowComments] = useState(false)
  return (
    <div>
      <div className="flex justify-between mb-4">
        <LinkButton onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide " : "Show "} comments
        </LinkButton>
        <LinkButton>Add comment</LinkButton>
      </div>
      {showComments && <CommentList />}
    </div>
  )
}

export { Comments }
