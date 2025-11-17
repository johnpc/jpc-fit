import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { getCurrentUser, signOut as amplifySignOut } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

type User = {
  username: string;
  userId: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const hubListener = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        checkUser();
      } else if (payload.event === "signedOut") {
        setUser(null);
      }
    });

    return () => hubListener();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser({
        username: currentUser.username,
        userId: currentUser.userId,
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await amplifySignOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
