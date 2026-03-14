import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SettingsAppearancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how the app looks on your device. Choose between light and dark theme. Changes apply globally.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Save appearance</Button>
      </CardContent>
    </Card>
  )
}
