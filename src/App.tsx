import { Route, Routes } from "react-router-dom"
import { Post } from "./pages/post"
import { User } from "./pages/user"
import { UserList } from "./pages/user-list"

// TODO: default route component

function App() {
  return (
    <Routes>
      <Route index element={<UserList />} />
      <Route path="user/:userId" element={<User />} />
      <Route path="user/:userId/:postId" element={<Post />} />
      <Route path="*" element={<div>TODO 404</div>} />
    </Routes>
  )
}

export default App
