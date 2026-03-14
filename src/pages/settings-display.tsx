import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

const sidebarItems = [
  { id: "recents", label: "Recents", defaultChecked: true },
  { id: "home", label: "Home", defaultChecked: true },
  { id: "applications", label: "Applications", defaultChecked: false },
  { id: "desktop", label: "Desktop", defaultChecked: false },
  { id: "downloads", label: "Downloads", defaultChecked: false },
  { id: "documents", label: "Documents", defaultChecked: false },
]

export function SettingsDisplayPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sidebarItems.map((i) => [i.id, i.defaultChecked]))
  )

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Display</CardTitle>
        <CardDescription>
          Turn items on or off to control what&apos;s displayed in the app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Sidebar</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select the items you want to display in the sidebar.
          </p>
          <div className="space-y-3">
            {sidebarItems.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <Checkbox
                  checked={checked[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        <Button>Update display</Button>
      </CardContent>
    </Card>
  )
}
