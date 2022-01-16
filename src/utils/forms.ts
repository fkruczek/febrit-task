import { FieldError } from "react-hook-form"

const rgxEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const appFieldsValidationRules = {
  title: {
    required: true,
    minLength: {
      message: "Title must be at least 3 characters",
      value: 3,
    },
    maxLength: {
      message: "Title must be at most 30 characters",
      value: 30,
    },
  },
  name: {
    required: true,
    minLength: {
      message: "Name must be at least 3 characters",
      value: 3,
    },
    maxLength: {
      message: "Name must be at most 30 characters",
      value: 30,
    },
  },
  body: {
    required: true,
    minLength: {
      message: "Body must be at least 10 characters",
      value: 10,
    },
    maxLength: {
      message: "Body must be at most 1000 characters",
      value: 1000,
    },
  },
  email: {
    required: true,
    pattern: {
      value: rgxEmail,
      message: "Email is invalid",
    },
  },
}

function getErrorMessage(error: FieldError) {
  if (error.message) {
    return error.message
  }
  if (error.type === "required") {
    return "This field is required"
  }
  return "Field is invalid"
}

export { getErrorMessage, appFieldsValidationRules }
