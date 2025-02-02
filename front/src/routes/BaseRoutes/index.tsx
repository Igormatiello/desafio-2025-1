import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductDetailsPage } from "@/pages/ProductDetailsPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/OrderPage";
import { AddressPage } from "@/pages/AddressPage"; 
import { OrdersPage } from "@/pages/MyOrdersPage";

export function BaseRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/home" element={<ProductListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/" element={<ProductListPage />} />
      {/* Private Routes */}
      <Route element={<AuthenticatedRoutes />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/orders" element={<OrdersPage />} /> {}
      </Route>
    </Routes>
  );
}
