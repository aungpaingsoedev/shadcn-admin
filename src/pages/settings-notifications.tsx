import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function SettingsNotificationsPage() {
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Configure how you receive notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={email} onCheckedChange={setEmail} />
          <span className="text-sm">Email notifications</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox checked={push} onCheckedChange={setPush} />
          <span className="text-sm">Push notifications</span>
        </label>
        <Button>Update preferences</Button>
      </CardContent>
    </Card>
  )
}
