import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../enum/UserRole";

interface AuthContextProps {
  user: { email: string } | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; role: UserRole } | null>(
    localStorage.getItem("currentUser")
      ? {
          email: localStorage.getItem("currentUser") as string,
          role: localStorage.getItem("currentUserRole") as UserRole,
        }
      : null
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8080/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.access_token);
        localStorage.setItem("currentUserRole", data.role);
        localStorage.setItem("currentUser", email);
        setUser({ email, role: data.role });
        if (data.role === UserRole.ADMIN) {
          navigate("/dashboard");
        } else {
          navigate("/welcome"); 
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  const role = user?.role || null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, role, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should be used in AuthProvider");
  }
  return context;
};
