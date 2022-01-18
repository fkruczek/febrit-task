import React from "react"
import { FieldError } from "react-hook-form"
import { getErrorMessage } from "../utils/forms"

function FieldErrorMessage({
  error,
  fieldName,
}: {
  error?: FieldError
  fieldName: string
}) {
  return (
    <p
      className="col-start-2 text-rose-700 absolute bottom-0 text-sm"
      role="alert"
      id={`${fieldName}-error`}
    >
      {error && getErrorMessage(error)}
    </p>
  )
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type FieldProps = {
  name: string
  error?: FieldError
}

function createInputStyles(isError: boolean) {
  return `
    ${isError ? "border-rose-600" : "border-default"}
     border-2 w-full focus:outline-none focus:border-indigo-700 p-1 shadow-sharp
    `
}

const Input = React.forwardRef<HTMLInputElement, InputProps & FieldProps>(
  ({ error, ...inputProps }, ref) => (
    <label className="grid gap-x-4 grid-cols-input-field relative pb-6 mb-2">
      <span className="capitalize mr-2 text-lg mt-1">{inputProps.name}</span>
      <input
        type="text"
        ref={ref}
        aria-invalid={!!error || undefined}
        aria-describedby={!!error ? `${inputProps.name}-error` : undefined}
        className={createInputStyles(!!error)}
        {...inputProps}
      />
      <FieldErrorMessage error={error} fieldName={inputProps.name} />
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
      ref={ref}
      className={createInputStyles(!!error)}
      aria-invalid={!!error || undefined}
      aria-describedby={!!error ? `${textareaProps.name}-error` : undefined}
      {...textareaProps}
    />
    <FieldErrorMessage error={error} fieldName={textareaProps.name} />
  </label>
))

export { Input, Textarea }
