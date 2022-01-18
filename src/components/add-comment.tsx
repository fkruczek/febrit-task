import { useForm } from "react-hook-form"
import { AddCommentInput } from "../types/api-models"
import { appFieldsValidationRules } from "../utils/forms"
import { noop } from "../utils/helpers"
import { AppDialog, useDialog } from "./app-dialog"
import { Button, LinkButton } from "./buttons"
import { Input, Textarea } from "./form"

function AddCommentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentInput>()
  const { closeDialog } = useDialog()
  const onSubmit = async (variables: AddCommentInput) => {
    console.log(variables)
    closeDialog()
  }
  const loading = false
  const serverError = false
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <Input
        error={errors.name}
        {...register("name", appFieldsValidationRules.name)}
      />
      <Input
        error={errors.email}
        type="email"
        {...register("email", appFieldsValidationRules.email)}
      />
      <Textarea
        error={errors.body}
        {...register("body", appFieldsValidationRules.body)}
      />
      {serverError && (
        <span className="text-rose-700 text-xl text-right">
          Something went wrong...
        </span>
      )}
      <div className="grid gap-4 sm:grid-cols-2 sm:w-2/3 sm:justify-self-end mt-4">
        <Button variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit" isLoading={loading}>
          {loading ? "Loading" : "Save"}
        </Button>
      </div>
    </form>
  )
}

function AddPostButton({ onClick = noop }: { onClick?: () => void }) {
  return <LinkButton onClick={onClick}>Add comment</LinkButton>
}

function AddCommentDialog() {
  return (
    <AppDialog title="Add comment" openButton={<AddPostButton />}>
      <AddCommentForm />
    </AppDialog>
  )
}

export { AddCommentDialog }
