import { Link } from "react-router-dom"
import { PostListElement } from "../types"

function PostList({ posts }: { posts: PostListElement[] }) {
  return (
    <div>
      {posts.map(({ id, title }) => (
        <div key={id}>
          <button type="button">Remove</button>
          <Link to={`${id}`}>{title + "   >"}</Link>
        </div>
      ))}
    </div>
  )
}

export { PostList }
