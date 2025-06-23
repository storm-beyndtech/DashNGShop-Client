import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

const roleRedirects: Record<string, string> = {
  customer: "/customer",
  storekeeper: "/storekeeper",
  salesrep: "/salesrep",
  admin: "/admin",
};

const AuthPageProtectedRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth();

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

  if (user) {
    // Redirect based on user role
    const redirectPath = roleRedirects[user.role] || "/";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthPageProtectedRoute;
