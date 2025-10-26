"use client"

import { useModal } from "@/components/providers/modal-provider"
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react"

export function ModalSystem() {
  const { modals, closeModal } = useModal()

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-12 h-12 text-green-500" />
      case "error":
        return <AlertCircle className="w-12 h-12 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />
      case "info":
        return <Info className="w-12 h-12 text-blue-500" />
      default:
        return <AlertCircle className="w-12 h-12 text-accent" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/30"
      case "error":
        return "bg-red-500/10 border-red-500/30"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30"
      case "info":
        return "bg-blue-500/10 border-blue-500/30"
      default:
        return "bg-accent/10 border-accent/30"
    }
  }

  return (
    <>
      {modals.map((modal) => (
        <div key={modal.id} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => closeModal(modal.id)} />

          {/* Modal */}
          <div
            className={`relative bg-card border rounded-lg p-6 max-w-sm w-full space-y-4 ${getBackgroundColor(modal.type)}`}
          >
            {/* Close Button */}
            <button
              onClick={() => closeModal(modal.id)}
              className="absolute top-4 right-4 p-1 hover:bg-secondary rounded-lg transition"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Icon */}
            <div className="flex justify-center">{getIcon(modal.type)}</div>

            {/* Content */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">{modal.title}</h2>
              <p className="text-sm text-muted-foreground">{modal.message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              {modal.type === "confirmation" ? (
                <>
                  <button
                    onClick={() => {
                      modal.onCancel?.()
                      closeModal(modal.id)
                    }}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-medium hover:bg-card transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      modal.onConfirm?.()
                      closeModal(modal.id)
                    }}
                    className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition"
                  >
                    {modal.action || "Confirm"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => closeModal(modal.id)}
                  className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
