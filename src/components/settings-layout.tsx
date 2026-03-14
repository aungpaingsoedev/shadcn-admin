import { NavLink, Outlet } from "react-router-dom"
import { User, Key, Sparkles, Bell, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNav = [
  { title: "Profile", href: "/settings", icon: User, end: true },
  { title: "Account", href: "/settings/account", icon: Key, end: false },
  { title: "Appearance", href: "/settings/appearance", icon: Sparkles, end: false },
  { title: "Notifications", href: "/settings/notifications", icon: Bell, end: false },
  { title: "Display", href: "/settings/display", icon: Monitor, end: false },
]

export function SettingsLayout() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <nav className="w-full shrink-0 sm:w-48 space-y-0.5">
          {settingsNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0 opacity-80" />
              {item.title}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 min-w-0 max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
