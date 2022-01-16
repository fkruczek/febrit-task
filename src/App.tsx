import { Route, Routes } from "react-router-dom"
import { NotFound } from "./pages/not-found"
import { Post } from "./pages/post"
import { User } from "./pages/user"
import { UserList } from "./pages/user-list"

// TODO: default route component

function App() {
  return (
    <div className="max-w-5xl m-auto p-4">
      <Routes>
        <Route index element={<UserList />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="user/:userId/:postId" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
