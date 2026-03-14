import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorPageUI } from "@/components/error-page-ui"
import { AlertTriangle } from "lucide-react"

const errorPreviews = [
  {
    code: 400 as const,
    title: "Bad Request",
    message: "Your request could not be processed.",
  },
  {
    code: 404 as const,
    title: "Page not found",
    message: "We couldn't find the page you're looking for.",
  },
  {
    code: 500 as const,
    title: "Server error",
    message: "Something went wrong. We're working on it.",
  },
]

export function ErrorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Error pages
        </h1>
        <p className="mt-1 text-muted-foreground">
          UI previews for 400, 404, and 500. Use these when errors occur.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {errorPreviews.map(({ code, title, message }) => (
          <Card key={code}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                {code} Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorPageUI
                code={code}
                title={title}
                message={message}
                compact
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Full page preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click a tab to see the full error page layout (400, 404, 500).
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 border-b pb-4">
            {errorPreviews.map(({ code }) => (
              <a
                key={code}
                href={`/errors/${code}`}
                className="rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              >
                {code}
              </a>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Click 400, 404, or 500 above to open the full error page in this layout.
          </p>
          <div className="mt-4 rounded-lg border bg-muted/20 min-h-[340px] overflow-hidden">
            <ErrorPageUI
              code={404}
              title="Page not found"
              message="We couldn't find the page you're looking for."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
