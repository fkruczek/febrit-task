import VisuallyHidden from "@reach/visually-hidden"
import Skeleton from "react-loading-skeleton"
import { useNavigate } from "react-router-dom"
import { useNameFromCache } from "../utils/user"

function UserHeader({
  name: nameFromProps,
  children,
  isLoading,
}: {
  name: string | null
  isLoading: boolean
  children?: React.ReactNode
}) {
  const navigate = useNavigate()
  const nameFromCache = useNameFromCache()

  const displayName = nameFromProps ?? nameFromCache

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
        {isLoading && !displayName ? (
          <Skeleton height={50} width={100} />
        ) : (
          displayName ?? "Autor doesn't exists"
        )}
      </span>
      <div className="justify-self-end w-12">{!!nameFromProps && children}</div>
    </header>
  )
}

export { UserHeader }
