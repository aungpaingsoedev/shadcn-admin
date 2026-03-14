import { useState } from "react"
import { Outlet } from "react-router-dom"
import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-dvh max-w-full bg-background">
      {/* Sidebar: visible from sm (640px) up; below that use Sheet in header */}
      <div
        className={cn(
          "hidden sm:flex flex-col transition-[width] duration-200 ease-in-out shrink-0 z-30",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <AppSidebar collapsed={!sidebarOpen} />
      </div>
      <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 min-h-0 overflow-auto overflow-x-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
