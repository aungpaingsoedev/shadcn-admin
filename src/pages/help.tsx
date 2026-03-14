import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Help Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Documentation and support.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Get help
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Browse docs, FAQs, and contact support.
          </p>
          <Button>Contact support</Button>
        </CardContent>
      </Card>
    </div>
  )
}
