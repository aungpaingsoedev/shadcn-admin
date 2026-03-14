import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthLoginSimplePage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-dvh relative">
      {/* Image side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-center p-10 text-white">
          <p className="text-xl font-semibold">Log in to continue</p>
          <p className="mt-2 max-w-sm text-sm opacity-90">
            Simple, secure access to your workspace.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-4 md:p-8 lg:p-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 z-10 text-sm text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          ← Back to dashboard
        </button>
        <div className="w-full max-w-sm space-y-8 rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-simple">Email</Label>
              <Input
                id="email-simple"
                type="email"
                placeholder="you@example.com"
                className="h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-simple">Password</Label>
              <Input
                id="password-simple"
                type="password"
                placeholder="••••••••"
                className="h-9"
              />
            </div>
            <Button type="submit" className="w-full h-9">
              Log in
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            <Link to="#" className="underline hover:text-foreground">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
