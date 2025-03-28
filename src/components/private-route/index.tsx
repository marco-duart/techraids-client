import { useEffect } from "react";
import { useAuth } from "../../context/user-provider";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../services/auth/DTO";
import { ReactNode } from "react";

interface Props {
  requiredRole: IUser.Role.CHARACTER | IUser.Role.NARRATOR;
  children?: ReactNode;
}

export const PrivateRoute = ({ requiredRole, children }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== requiredRole) {
      navigate("/access-denied");
    }
  }, [user, requiredRole, navigate]);

  return user?.role === requiredRole ? <>{children}</> : null;
};
