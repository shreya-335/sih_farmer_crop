"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Modal {
  id: string
  type: "success" | "error" | "info" | "warning" | "confirmation"
  title: string
  message: string
  action?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface ModalContextType {
  modals: Modal[]
  showModal: (modal: Omit<Modal, "id">) => void
  closeModal: (id: string) => void
  clearModals: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<Modal[]>([])

  const showModal = (modal: Omit<Modal, "id">) => {
    const id = Date.now().toString()
    setModals((prev) => [...prev, { ...modal, id }])
  }

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id))
  }

  const clearModals = () => {
    setModals([])
  }

  return (
    <ModalContext.Provider value={{ modals, showModal, closeModal, clearModals }}>{children}</ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within ModalProvider")
  }
  return context
}
