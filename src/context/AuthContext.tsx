import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: "owner" | "caretaker";
    city?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  function getUsers(): User[] {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }

  function saveUsers(users: User[]) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    if (!email || !password) return { success: false, error: "Please fill in all fields." };
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "No account found with this email." };
    // any password accepted for demo
    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return { success: true };
  }

  function signup(data: {
    name: string;
    email: string;
    password: string;
    role: "owner" | "caretaker";
    city?: string;
  }): { success: boolean; error?: string } {
    if (!data.name || !data.email || !data.password)
      return { success: false, error: "Please fill in all required fields." };
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase()))
      return { success: false, error: "An account with this email already exists." };

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date().toISOString(),
      city: data.city,
    };
    saveUsers([...users, newUser]);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
