import { useForm } from "react-hook-form"
import { AddPostInput } from "../../types"
import { useCreatePost } from "../../utils/posts"
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title
        <input
          type="text"
          {...register("title", { required: true, min: 10, maxLength: 100 })}
        />
        {errors.title}
      </label>
      <label>
        Body
        <textarea {...register("body", { required: true, maxLength: 1000 })} />
      </label>
      {serverError && <div>Something went wrong todo</div>}
      <button disabled={loading}>Cancel</button>
      <button type="submit" disabled={loading}>
        {loading ? "Loading" : "Save"}
      </button>
    </form>
  )
}

function AddPostDialog() {
  return (
    <AppDialog
      title="Add post"
      openButton={<button type="button">Open dialog</button>}
    >
      <AddPostForm />
    </AppDialog>
  )
}

export { AddPostDialog }
