type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>
function Anchor({ children, ...props }: AnchorProps) {
  return (
    <a
      className="underline text-sky-700 text-sm focus:outline-none focus:text-yellow-500"
      {...props}
    >
      {children}
    </a>
  )
}

export { Anchor }
