import { Outlet } from "react-router-dom"

/**
 * Full-page layout for auth (login, signup, etc.). No sidebar, no dashboard header.
 */
export function AuthLayout() {
  return (
    <div className="min-h-dvh bg-background">
      <Outlet />
    </div>
  )
}
