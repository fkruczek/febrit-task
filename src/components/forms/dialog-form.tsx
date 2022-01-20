import { useDialog } from "../app-dialog"
import { Button } from "../buttons"

type DialogFormFooterProps = {
  isError?: boolean
  isLoading: boolean
}

function DialogFormFooter({ isError, isLoading }: DialogFormFooterProps) {
  const { closeDialog } = useDialog()

  return (
    <>
      {isError && (
        <span role="alert" className="text-rose-700 text-xl text-right">
          Something went wrong...
        </span>
      )}
      <div className="grid gap-4 sm:grid-cols-2 sm:w-2/3 sm:justify-self-end mt-4">
        <Button variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isLoading ? "Loading" : "Save"}
        </Button>
      </div>
    </>
  )
}

export { DialogFormFooter }
