import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function AuthLoginPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-dvh relative">
      {/* Image side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-10 text-white">
          <p className="text-lg font-medium opacity-90">Shadcn Admin</p>
          <p className="mt-1 max-w-sm text-sm opacity-80">
            Manage your dashboard, users, and products in one place.
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
        <Card className="w-full max-w-md border-0 shadow-none lg:shadow-sm lg:border">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground">
              S
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-10"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox id="remember" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Button className="w-full h-10">Sign in</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="#" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
