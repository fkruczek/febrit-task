import VisuallyHidden from "@reach/visually-hidden"
import { useForm } from "react-hook-form"
import { AddPostInput } from "../types/api-models"
import { appFieldsValidationRules } from "../utils/forms"
import { noop } from "../utils/helpers"
import { useCreatePost } from "../api/posts"
import { AppDialog, useDialog } from "./app-dialog"
import { DialogFormFooter } from "./forms/dialog-form"
import { Input, Textarea } from "./forms/inputs"
import { Plus } from "./vectors"

function AddPostForm() {
  const [addPost, { loading, error: serverError }] = useCreatePost()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPostInput>()
  const { closeDialog } = useDialog()

  const onSubmit = async (variables: AddPostInput) => {
    await addPost({ variables })
    closeDialog()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <Input
        error={errors.title}
        {...register("title", appFieldsValidationRules.title)}
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
  return (
    <button
      onClick={onClick}
      type="button"
      title="Add post"
      className="w-12 h-12 border-4 border-black rounded-full bg-indigo-700 flex items-center justify-center focus:outline-none focus:bg-yellow-400 hover:bg-yellow-400"
    >
      <Plus />
      <VisuallyHidden>Add post</VisuallyHidden>
    </button>
  )
}

function AddPostDialog() {
  return (
    <AppDialog title="Add post" openButton={<AddPostButton />}>
      <AddPostForm />
    </AppDialog>
  )
}

export { AddPostDialog }
