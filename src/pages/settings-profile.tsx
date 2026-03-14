import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SettingsProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your display name and email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Name</label>
          <Input placeholder="satnaing" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="satnaingdev@gmail.com" />
        </div>
        <Button>Save changes</Button>
      </CardContent>
    </Card>
  )
}
