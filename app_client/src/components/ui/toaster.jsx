import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "../../hooks/use-toast"

/**
 * Toaster component that manages and displays toast notifications
 * This should be placed at the root of your application
 * 
 * @component
 * @example
 * // In your App.jsx or root component:
 * function App() {
 *   return (
 *     <div>
 *       <YourAppContent />
 *       <Toaster />
 *     </div>
 *   )
 * }
 * 
 * // Usage in components:
 * import { useToast } from "@/hooks/use-toast"
 * 
 * function MyComponent() {
 *   const { toast } = useToast()
 *   
 *   const handleClick = () => {
 *     toast({
 *       title: "Success",
 *       description: "Your action was completed successfully.",
 *     })
 *   }
 *   
 *   return <button onClick={handleClick}>Show Toast</button>
 * }
 */

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}