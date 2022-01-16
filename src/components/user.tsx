import { useNavigate } from "react-router-dom"

function UserHeader({
  name,
  children,
}: {
  name: string
  children?: React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <header>
      <button type="button" onClick={() => navigate(-1)}>
        back
      </button>
      <span>{name}asdf</span>
      {children}
    </header>
  )
}

export { UserHeader }
