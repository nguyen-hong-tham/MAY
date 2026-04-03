import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "@/pages/auth/Login"
import { ProtectedRoute } from "@/pages/auth/components"
import StaffDashboard from "@/pages/dashboard/StaffDashboard"
import { CategoriesList } from "@/pages/categories/components"

import MainLayout from "@/layouts/MainLayout"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ADMIN routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="categories" element={<CategoriesList />} />
          
          {/* future pages */}
          {/* <Route path="toppings" element={<ToppingsList />} /> */}
          {/* <Route path="products" element={<Products />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
          {/* <Route path="users" element={<Users />} /> */}
        </Route>

        {/* STAFF routes */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={["STAFF"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StaffDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}