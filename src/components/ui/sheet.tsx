import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

const Sheet = ({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false)
  const isControlled = open !== undefined
  const value = {
    open: isControlled ? open : isOpen,
    onOpenChange: onOpenChange ?? setIsOpen,
  }
  return (
    <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, onClick, ...props }, ref) => {
  const ctx = React.useContext(SheetContext)
  if (!ctx) return null
  return (
    <button
      ref={ref}
      type="button"
      className={cn(className)}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        ctx.onOpenChange(true)
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </button>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, side = "left", children, ...props }, ref) => {
  const ctx = React.useContext(SheetContext)
  if (!ctx) return null
  if (!ctx.open) return null

  const content = (
    <>
      <div
        role="presentation"
        className="fixed inset-0 z-[100] bg-black/50 animate-in fade-in duration-200"
        onClick={() => ctx.onOpenChange(false)}
        onKeyDown={(e) => e.key === "Escape" && ctx.onOpenChange(false)}
        aria-hidden
      />
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 z-[101] flex h-full w-72 flex-col gap-4 border-r bg-background p-6 shadow-lg transition-transform duration-300 ease-out",
          side === "left"
            ? "left-0 animate-in slide-in-from-left duration-300"
            : "right-0 animate-in slide-in-from-right duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )

  if (typeof document !== "undefined") {
    return createPortal(content, document.body)
  }
  return content
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
