import Skeleton from "react-loading-skeleton"
import { ContainerProps } from "../types/util"

function PostContentContainer({ children }: ContainerProps) {
  return <div className="grid gap-4 my-10">{children}</div>
}

function PostContentSkeleton() {
  return (
    <PostContentContainer>
      <Skeleton height={50} />
      <Skeleton height={200} />
    </PostContentContainer>
  )
}

function PostContent({
  title,
  body,
}: {
  title: string | null
  body: string | null
}) {
  return (
    <PostContentContainer>
      <h1 className="text-4xl">{title ?? "Post doesn't exists"}</h1>
      <p>{body && body.repeat(10)}</p>
    </PostContentContainer>
  )
}

export { PostContent, PostContentSkeleton }
