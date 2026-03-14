import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  MessageCircle,
  Users,
  UserCircle,
  Package,
  FolderTree,
  Lock,
  ChevronRight,
  User,
  AlertTriangle,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const generalNav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Chats", href: "/chats", icon: MessageCircle, badge: 3 },
  { title: "Users", href: "/users", icon: Users },
  { title: "Customers", href: "/customers", icon: UserCircle },
  { title: "Products", href: "/products", icon: Package },
  { title: "Category", href: "/category", icon: FolderTree },
  { title: "Secured by Clerk", href: "/secured", icon: Lock, external: true },
]

const authSubmenu = [
  { title: "Login", href: "/auth/login" },
  { title: "Login (Simple)", href: "/auth/login-simple" },
]

const errorsSubmenu = [
  { title: "500 Error", href: "/errors/500" },
  { title: "400 Error", href: "/errors/400" },
  { title: "404 Error", href: "/errors/404" },
]

const pagesNav = [
  { title: "Auth", icon: User, children: authSubmenu },
  { title: "Errors", icon: AlertTriangle, children: errorsSubmenu },
]

const otherNav = [
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Help Center", href: "/help", icon: HelpCircle },
]

const allNav = [...generalNav, ...pagesNav, ...otherNav]

export function AppSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const location = useLocation()
  const [errorsOpen, setErrorsOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  const isErrorsActive = location.pathname.startsWith("/errors/")
  const isAuthActive = location.pathname.startsWith("/auth/")
  useEffect(() => {
    if (isErrorsActive) setErrorsOpen(true)
  }, [isErrorsActive])
  useEffect(() => {
    if (isAuthActive) setAuthOpen(true)
  }, [isAuthActive])

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    if (href === "/settings") return location.pathname.startsWith("/settings")
    return location.pathname === href
  }

  if (collapsed) {
    return (
      <aside className="flex h-full w-16 flex-col items-center border-r bg-card/50 dark:bg-card">
        {/* Logo - icon only */}
        <div className="flex h-14 w-full items-center justify-center border-b">
          <Link
            to="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90"
          >
            S
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto w-full py-3 space-y-0.5 flex flex-col items-center">
          {allNav.map((item) => {
            const hasChildren = "children" in item && Array.isArray(item.children)
            const href = hasChildren ? (item.children as { href: string }[])[0]?.href : (item as { href: string }).href
            const children = hasChildren ? (item as { children: { href: string }[] }).children : undefined
            const active = hasChildren ? children!.some((c) => location.pathname === c.href) : isActive((item as { href: string }).href)
            return (
              <Link
                key={hasChildren ? item.title : (item as { href: string }).href}
                to={href}
                title={item.title}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {"badge" in item && typeof (item as { badge?: number }).badge === "number" && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
                    {(item as { badge: number }).badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <Separator className="w-full" />

        <div className="p-2 w-full flex justify-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
              SN
            </AvatarFallback>
          </Avatar>
        </div>
      </aside>
    )
  }

  const NavLink = ({
    item,
    active,
  }: {
    item: (typeof generalNav)[0] | (typeof otherNav)[0] | { title: string; href: string; icon: typeof User }
    active: boolean
  }) => (
    <Link
      to={item.href}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0 opacity-80" />
      <span className="flex-1">{item.title}</span>
      {"badge" in item && item.badge != null && (
        <Badge variant="destructive" className="h-5 min-w-5 px-1 text-xs">
          {item.badge}
        </Badge>
      )}
      {(item as { external?: boolean }).external || ["Auth", "Errors", "Settings"].includes(item.title) ? (
        <ChevronRight className="h-4 w-4 shrink-0 opacity-70" />
      ) : null}
    </Link>
  )

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card/50 dark:bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          S
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-foreground text-sm leading-tight">
            Shadcn Admin
          </span>
          <span className="text-xs text-muted-foreground">Vite + ShadcnUI</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        <div>
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            General
          </p>
          <div className="space-y-0.5">
            {generalNav.map((item) => (
              <NavLink key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Pages
          </p>
          <div className="space-y-0.5">
            {pagesNav.map((item) => (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() =>
                    item.title === "Auth"
                      ? setAuthOpen((o) => !o)
                      : setErrorsOpen((o) => !o)
                  }
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    (item.title === "Auth" ? isAuthActive : isErrorsActive)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 opacity-70 transition-transform",
                      (item.title === "Auth" ? authOpen : errorsOpen) && "rotate-90"
                    )}
                  />
                </button>
                {(item.title === "Auth" ? authOpen : errorsOpen) && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-2">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className={cn(
                          "flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                          location.pathname === sub.href
                            ? "font-medium text-foreground bg-muted"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        )}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Other
          </p>
          <div className="space-y-0.5">
            {otherNav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={item.href === "/settings" ? location.pathname.startsWith("/settings") : isActive(item.href)}
              />
            ))}
          </div>
        </div>
      </nav>

      <Separator />

      <div className="p-3">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-muted transition-colors"
        >
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
              SN
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              satnaing
            </p>
            <p className="truncate text-xs text-muted-foreground flex items-center gap-0.5">
              satnaingdev@gmail.com
              <ChevronDown className="h-3 w-3 shrink-0" />
            </p>
          </div>
        </button>
      </div>
    </aside>
  )
}
