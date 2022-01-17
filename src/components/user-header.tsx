import VisuallyHidden from "@reach/visually-hidden"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"

function UserHeader({
  name,
  children,
  isLoading,
}: {
  name: string | null
  isLoading: boolean
  children?: React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <header className="grid grid-cols-user-header h-36 items-center w-full">
      <button
        type="button"
        title="Navigate back"
        className="text-6xl justify-self-start"
        onClick={() => navigate(-1)}
      >
        <VisuallyHidden>Navigate back</VisuallyHidden>
        👈
      </button>
      <span className="text-xl sm:text-3xl text-center">
        {isLoading ? (
          <Skeleton height={50} width={250} />
        ) : (
          name ?? "Author not found"
        )}
      </span>
      <div className="justify-self-end w-12">{!!name && children}</div>
    </header>
  )
}

export { UserHeader }
