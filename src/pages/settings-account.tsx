import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SettingsAccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your password and security.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Current password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">New password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Button>Update password</Button>
      </CardContent>
    </Card>
  )
}
