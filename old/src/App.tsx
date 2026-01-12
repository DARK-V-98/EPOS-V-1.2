import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/categories" element={<Dashboard />} />
            <Route path="/warehouses" element={<Dashboard />} />
            <Route path="/suppliers" element={<Dashboard />} />
            <Route path="/purchases" element={<Dashboard />} />
            <Route path="/purchases/add" element={<Dashboard />} />
            <Route path="/purchases/returns" element={<Dashboard />} />
            <Route path="/pos" element={<Dashboard />} />
            <Route path="/sales" element={<Dashboard />} />
            <Route path="/sales/returns" element={<Dashboard />} />
            <Route path="/customers" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="/notifications" element={<Dashboard />} />
            <Route path="/subscription" element={<Dashboard />} />
            <Route path="/security" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
