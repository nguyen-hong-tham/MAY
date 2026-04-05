import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "@/pages/auth/Login"
import { ProtectedRoute } from "@/pages/auth/components"
import Dashboard from "@/pages/dashboard/Dashboard"
import { CategoriesList } from "@/pages/categories/components"
import { ToppingsList } from "@/pages/toppings/components"
import { ProductsList } from "@/pages/products/components"
import MainLayout from "@/layouts/MainLayout"
import Users from "@/pages/users/Users"
import OrdersPage from "@/pages/orders/index"
import RevenuesPage from "@/pages/revenues/index"
export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute roles={["ADMIN", "STAFF"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="toppings" element={<ToppingsList />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="revenues" element={<RevenuesPage />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}