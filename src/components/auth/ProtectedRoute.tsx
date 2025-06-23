// components/auth/ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "customer" | "salesrep" | "storekeeper" | "admin";
  requireAuth?: boolean;
}

const ProtectedRoute = ({ children, requiredRole, requireAuth = true }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-neutral-600" />
          <p className="text-neutral-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    const roleRedirects: Record<string, string> = {
      customer: "/shop",
      salesrep: "/salesrep",
      storekeeper: "/storekeeper",
      admin: "/admin",
    };

    const redirectPath = roleRedirects[user?.role || "customer"] || "/";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
