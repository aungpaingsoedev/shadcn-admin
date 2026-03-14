import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, Moon, Sun, Settings, Search } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function AppHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [sheetOpen, setSheetOpen] = useState(false)

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"))
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/95 px-4 md:pr-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 min-w-0">
      {/* Left: menu + title + search */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center rounded-md hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <AppSidebar />
          </SheetContent>
        </Sheet>
        <button
          type="button"
          onClick={onMenuClick}
          className={cn(
            "hidden md:flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-muted",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden md:flex flex-1 items-center gap-3 min-w-0 max-w-xl">
          <Link
            to="/"
            className="shrink-0 font-semibold text-foreground transition-opacity hover:opacity-80"
          >
            Shadcn Admin
          </Link>
          <div className="relative flex-1 min-w-0 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search"
              className="h-9 w-full border-0 bg-muted/50 pl-9 focus-visible:ring-1"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex h-5">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: theme, settings, avatar */}
      <div className="flex shrink-0 items-center gap-0.5 md:gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        <Link to="/settings" aria-label="Settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
            SN
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
