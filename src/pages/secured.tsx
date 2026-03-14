import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecuredPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Secured by Clerk
        </h1>
        <p className="text-muted-foreground mt-1">
          Authentication and user management powered by Clerk.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Clerk Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Add Clerk to your app for sign-in, sign-up, and user management.
          </p>
          <a href="https://clerk.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Learn more</Button>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
