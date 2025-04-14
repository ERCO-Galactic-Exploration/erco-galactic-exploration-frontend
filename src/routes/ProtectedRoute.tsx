import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const result = await checkAuth();

      // Si el resultado no es null, significa que está autenticado
      setIsAuth(!!result);
      setLoading(false);
    };

    validate();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-white text-lg">
        Cargando...
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;