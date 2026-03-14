import { ErrorPageUI } from "@/components/error-page-ui"

export function Error500Page() {
  return (
    <ErrorPageUI
      code={500}
      title="Something went wrong"
      message="We're sorry, but something went wrong on our end. Please try again later."
    />
  )
}
