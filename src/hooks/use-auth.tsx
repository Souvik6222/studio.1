// This is a mock authentication hook for demonstration purposes.
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User, UserRole } from "@/lib/types";
import { users } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole | null;
    if (storedRole) {
      const userToLogin = users.find((u) => u.role === storedRole);
      setUser(userToLogin || null);
    }
  }, []);

  const login = (role: UserRole) => {
    const userToLogin = users.find((u) => u.role === role);
    if (userToLogin) {
      setUser(userToLogin);
      localStorage.setItem("userRole", role);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
