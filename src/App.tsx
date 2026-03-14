import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AuthLayout } from "@/components/auth-layout"
import { SettingsLayout } from "@/components/settings-layout"
import { DashboardPage } from "@/pages/dashboard"
import { UsersPage } from "@/pages/users"
import { CustomersPage } from "@/pages/customers"
import { ProductsPage } from "@/pages/products"
import { ProductDetailPage } from "@/pages/product-detail"
import { CategoryPage } from "@/pages/category"
import { ChatsPage } from "@/pages/chats"
import { SecuredPage } from "@/pages/secured"
import { AuthLoginPage } from "@/pages/auth-login"
import { AuthLoginSimplePage } from "@/pages/auth-login-simple"
import { ErrorsPage } from "@/pages/errors"
import { Error400Page } from "@/pages/error-400"
import { Error404Page } from "@/pages/error-404"
import { Error500Page } from "@/pages/error-500"
import { HelpPage } from "@/pages/help"
import { SettingsProfilePage } from "@/pages/settings-profile"
import { SettingsAccountPage } from "@/pages/settings-account"
import { SettingsAppearancePage } from "@/pages/settings-appearance"
import { SettingsNotificationsPage } from "@/pages/settings-notifications"
import { SettingsDisplayPage } from "@/pages/settings-display"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth + error pages */}
        <Route element={<AuthLayout />}>
          <Route path="auth/login" element={<AuthLoginPage />} />
          <Route path="auth/login-simple" element={<AuthLoginSimplePage />} />
          <Route path="errors/400" element={<Error400Page />} />
          <Route path="errors/404" element={<Error404Page />} />
          <Route path="errors/500" element={<Error500Page />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="chats" element={<ChatsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="secured" element={<SecuredPage />} />
          <Route path="errors" element={<ErrorsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<SettingsProfilePage />} />
            <Route path="account" element={<SettingsAccountPage />} />
            <Route path="appearance" element={<SettingsAppearancePage />} />
            <Route path="notifications" element={<SettingsNotificationsPage />} />
            <Route path="display" element={<SettingsDisplayPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
