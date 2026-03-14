import { ErrorPageUI } from "@/components/error-page-ui"

export function Error400Page() {
  return (
    <ErrorPageUI
      code={400}
      title="Bad Request"
      message="Your request could not be processed. Please check the URL or try again."
    />
  )
}
