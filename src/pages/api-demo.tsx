import { useState } from "react"
import { demoUsers } from "@/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Puzzle, CheckCircle } from "lucide-react"

export function ApiDemoPage() {
  const [result, setResult] = useState<string | null>(null)

  const showDemoData = () => {
    setResult(JSON.stringify(demoUsers.slice(0, 3), null, 2))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Puzzle className="h-8 w-8 text-primary" />
          Demo Data
        </h1>
        <p className="text-muted-foreground mt-1">
          All data is from <code className="rounded bg-muted px-1 py-0.5 text-sm">src/lib/demo-data.ts</code>. No API calls.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demo data</CardTitle>
            <p className="text-sm text-muted-foreground">
              Users, Products, and Categories are loaded from demo data. Replace with your API when ready.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={showDemoData} className="w-full">
              Show sample users (demo)
            </Button>
            {result && (
              <div className="rounded-lg border bg-muted/30 p-4">
                <Badge variant="success" className="mb-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Demo data
                </Badge>
                <pre className="text-xs overflow-auto max-h-48">{result}</pre>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Puzzle SDK</CardTitle>
            <p className="text-sm text-muted-foreground">
              For Aleo dApps, install <code className="rounded bg-muted px-1">@puzzlehq/sdk</code> and wrap your app with <code className="rounded bg-muted px-1">PuzzleWalletProvider</code>.
            </p>
          </CardHeader>
          <CardContent>
            <a
              href="https://docs.puzzle.online/guides/sdk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Puzzle SDK Docs →
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
