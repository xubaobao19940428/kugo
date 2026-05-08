import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import "@/styles/toast.scss"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: (id: string) => void
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, type = 'default', onClose }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => onClose?.(id), 300)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "toast",
          isVisible && "toast--visible",
          `toast--${type}`
        )}
        role="alert"
      >
        <div className="toast__content">
          {title && <div className="toast__title">{title}</div>}
          {description && <div className="toast__description">{description}</div>}
        </div>
        <button 
          onClick={handleClose}
          className="toast__close"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    )
  }
)
Toast.displayName = "Toast"

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToast = (toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])

    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 3000)
    }
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
