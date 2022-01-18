import VisuallyHidden from "@reach/visually-hidden"
import { useForm } from "react-hook-form"
import { AddPostInput } from "../../types/api-models"
import { appFieldsValidationRules } from "../../utils/forms"
import { noop } from "../../utils/helpers"
import { useCreatePost } from "../../utils/posts"
import { Button } from "../buttons"
import { Input, Textarea } from "../form"
import { Plus } from "../vectors"
import { AppDialog, useDialog } from "./app-dialog"

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
  return (
    <button
      onClick={onClick}
      type="button"
      title="Add post"
      className="w-12 h-12 border-4 border-default rounded-full bg-indigo-700 flex items-center justify-center focus:outline-none focus:bg-yellow-400 hover:bg-yellow-400"
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
