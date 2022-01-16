import { Dialog } from "@reach/dialog"
import React, { useState } from "react"

type DialogContextType = { openDialog: () => void; closeDialog: () => void }

const DialogContext = React.createContext<DialogContextType | null>(null)

function AppDialog({
  title,
  openButton,
  children,
}: {
  title: string
  openButton: JSX.Element
  children: JSX.Element
}) {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div>
      {React.cloneElement(openButton, { onClick: open })}
      <Dialog isOpen={isOpen} onDismiss={close} aria-label={title}>
        <h1>{title}</h1>
        <DialogContext.Provider
          value={{ openDialog: open, closeDialog: close }}
        >
          {children}
        </DialogContext.Provider>
      </Dialog>
    </div>
  )
}

function useDialog() {
  const value = React.useContext(DialogContext)
  if (value === null) {
    throw new Error("useDialog must be used within a Dialog")
  }
  return value
}

export { AppDialog, useDialog }
