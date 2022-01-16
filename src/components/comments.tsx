import { useState } from "react"
import { useComments } from "../utils/comment"

function CommentList() {
  const { data, loading, error } = useComments()
  if (loading) return <p>Loading...</p>
  if (error || !data) return <p>Error :(</p>

  return (
    <div>
      {data.post.comments.data.map(({ body, email, id, name }) => (
        <div key={id}>
          <div>{name}</div>
          <div>{email}</div>
          <div>{body}</div>
        </div>
      ))}
    </div>
  )
}

function Comments() {
  const [showComments, setShowComments] = useState(false)
  return (
    <div>
      <button type="button" onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide " : "Show "} comments
      </button>
      <button type="button">Add comment</button>
      {showComments && <CommentList />}
    </div>
  )
}

export { Comments }
