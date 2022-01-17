import { Spinner } from "./vectors"

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
  size = "lg",
  disabled,
  isLoading,
}: ButtonProps) {
  return `bg-blue-900 font-bold py-2 px-4 border-2 border-black shadow focus:outline-none flex justify-center items-center shadow-sharp ${
    variant === "primary"
      ? "bg-indigo-700 text-white hover:bg-indigo-500 focus:bg-indigo-500"
      : "bg-white hover:bg-yellow-200 focus:bg-red-200"
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
      {...buttonProps}
      className={createButtonStyles(props)}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export { Button }
