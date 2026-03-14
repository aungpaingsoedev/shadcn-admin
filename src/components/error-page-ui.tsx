import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, AlertCircle, FileQuestion, ServerCrash } from "lucide-react"

type ErrorPageUIProps = {
  code: 400 | 404 | 500
  title: string
  message: string
  className?: string
  compact?: boolean
}

const config = {
  400: {
    icon: AlertCircle,
    label: "Bad Request",
    description: "The request could not be understood or was invalid.",
  },
  404: {
    icon: FileQuestion,
    label: "Not Found",
    description: "The page you're looking for doesn't exist or was moved.",
  },
  500: {
    icon: ServerCrash,
    label: "Internal Server Error",
    description: "Something went wrong on our end. Please try again later.",
  },
}

export function ErrorPageUI({ code, title, message, className, compact }: ErrorPageUIProps) {
  const { icon: Icon, label, description } = config[code]

  if (compact) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border bg-card p-8 text-center",
          className
        )}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <Icon className="h-7 w-7" />
        </div>
        <p className="mt-3 text-2xl font-bold tabular-nums text-foreground">{code}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center",
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <p className="mt-6 text-6xl font-bold tabular-nums tracking-tight text-foreground">
        {code}
      </p>
      <h1 className="mt-2 text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      <Link to="/">
        <Button className="mt-8">
          <Home className="mr-2 h-4 w-4" />
          Back to home
        </Button>
      </Link>
    </div>
  )
}
