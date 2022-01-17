type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>
function Anchor({ children, ...props }: AnchorProps) {
  return (
    <a className="underline text-sky-700 text-sm" {...props}>
      {children}
    </a>
  )
}

export { Anchor }
