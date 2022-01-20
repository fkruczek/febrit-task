import VisuallyHidden from "@reach/visually-hidden"
import { Link, LinkProps } from "react-router-dom"
import { Spinner, TrashCan } from "./vectors"

type ButtonProps = {
  variant?: "primary" | "secondary"
  size?: "md" | "lg"
  isLoading?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

function createButtonStyles({
  variant = "primary",
  size = "md",
  disabled,
  isLoading,
}: ButtonProps) {
  return `bg-blue-900 font-bold py-2 px-4 border-2 border-default shadow focus:outline-none flex justify-center items-center shadow-sharp ${
    variant === "primary"
      ? "bg-indigo-700 text-white hover:bg-indigo-500 focus:bg-indigo-500"
      : "bg-white hover:bg-yellow-200 focus:bg-yellow-400"
  } ${
    disabled
      ? "cursor-not-allowed border-slate-600 text-slate-600"
      : "cursor-pointer"
  } ${isLoading && "bg-indigo-300 pointer-events-none"} ${
    size === "lg" && "text-xl py-4 px-16"
  }`
}

function Button(props: ButtonProps) {
  const { isLoading = false, children, ...buttonProps } = props
  return (
    <button
      type="button"
      className={createButtonStyles(props)}
      {...buttonProps}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

function LinkButton(props: ButtonProps) {
  return (
    <button type="button" className="underline text-cyan-700" {...props}>
      {props.children}
    </button>
  )
}

function ButtonStyledRouterLink(props: LinkProps) {
  return (
    <Link
      className={createButtonStyles({ variant: "secondary", size: "lg" })}
      {...props}
    >
      {props.children}
    </Link>
  )
}

function RemoveButton({
  onDelete,
  isLoading,
  title,
}: {
  onDelete: () => unknown
  isLoading: boolean
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      className="pl-4 fill-indigo-700 hover:fill-yellow-500 focus:outline-none focus:fill-yellow-500"
      onClick={onDelete}
    >
      {isLoading ? <Spinner /> : <TrashCan />}
      <VisuallyHidden>{title}</VisuallyHidden>
    </button>
  )
}

export { Button, LinkButton, ButtonStyledRouterLink, RemoveButton }
