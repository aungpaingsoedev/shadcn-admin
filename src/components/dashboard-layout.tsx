import { useState } from "react"
import { Outlet } from "react-router-dom"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-dvh bg-background">
      <div
        className={cn(
          "hidden md:flex flex-col transition-[width] duration-200 ease-in-out shrink-0",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <AppSidebar collapsed={!sidebarOpen} />
      </div>
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 min-h-0 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
