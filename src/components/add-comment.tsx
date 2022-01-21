import { useForm } from "react-hook-form"
import { AddCommentInput } from "../types/api-models"
import { useCreateComment } from "../api/comments"
import { appFieldsValidationRules } from "../utils/forms"
import { noop } from "../utils/helpers"
import { AppDialog, useDialog } from "./app-dialog"
import { LinkButton } from "./buttons"
import { DialogFormFooter } from "./forms/dialog-form"
import { Input, Textarea } from "./forms/inputs"

type AddCommentFormProps = {
  setShowComments: (showComments: boolean) => void
}

function AddCommentForm({ setShowComments }: AddCommentFormProps) {
  const [addComment, { loading, error: serverError }] = useCreateComment()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentInput>()
  const { closeDialog } = useDialog()

  const onSubmit = async (variables: AddCommentInput) => {
    await addComment({ variables })
    closeDialog()
    setShowComments(true)
  }

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
      <DialogFormFooter isLoading={loading} isError={!!serverError} />
    </form>
  )
}

function AddPostButton({ onClick = noop }: { onClick?: () => void }) {
  return <LinkButton onClick={onClick}>Add comment</LinkButton>
}

function AddCommentDialog(props: AddCommentFormProps) {
  return (
    <AppDialog title="Add comment" openButton={<AddPostButton />}>
      <AddCommentForm {...props} />
    </AppDialog>
  )
}

export { AddCommentDialog }
