import { ErrorPageUI } from "@/components/error-page-ui"

export function Error404Page() {
  return (
    <ErrorPageUI
      code={404}
      title="Page not found"
      message="We couldn't find the page you're looking for. It may have been moved or deleted."
    />
  )
}
