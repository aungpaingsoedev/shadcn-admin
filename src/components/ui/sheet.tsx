import * as React from "react"
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
        ctx.onOpenChange(!ctx.open)
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
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => ctx.onOpenChange(false)}
        aria-hidden
      />
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-72 flex-col gap-4 border-r bg-background p-6 shadow-lg transition-transform duration-300",
          side === "left" ? "left-0" : "right-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
