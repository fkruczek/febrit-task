import React from "react"
import { FieldError } from "react-hook-form"
import { getErrorMessage } from "../utils/forms"

function FieldErrorMessage({ error }: { error?: FieldError }) {
  return (
    <span className="col-start-2 text-rose-700 absolute bottom-0 text-sm">
      {error && getErrorMessage(error)}
    </span>
  )
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type FieldProps = {
  error?: FieldError
}

function createInputStyles(isError: boolean) {
  return `
    ${isError ? "border-rose-600" : "border-black"}
     border-2 w-full focus:outline-none focus:border-indigo-700 p-1 shadow-sharp
    `
}

// TODO: maybe remove duplication with Textarea

const Input = React.forwardRef<HTMLInputElement, InputProps & FieldProps>(
  ({ error, ...inputProps }, ref) => (
    <label className="grid gap-x-4 grid-cols-input-field relative pb-6 mb-2">
      <span className="capitalize mr-2 text-lg mt-1">{inputProps.name}</span>
      <input
        type="text"
        {...inputProps}
        ref={ref}
        className={createInputStyles(!!error)}
      />
      <FieldErrorMessage error={error} />
    </label>
  )
)

type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps & FieldProps
>(({ error, ...textareaProps }, ref) => (
  <label className="grid gap-x-4 grid-cols-input-field relative pb-6 mb-2 text-lg">
    <span className="capitalize mr-2 text-lg mt-1">{textareaProps.name}</span>
    <textarea
      {...textareaProps}
      ref={ref}
      className={createInputStyles(!!error)}
    />
    <FieldErrorMessage error={error} />
  </label>
))

export { Input, Textarea }
