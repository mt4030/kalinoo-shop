import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CustomerSession } from "../types/auth.types";
import { supabase } from "@/lib/supabase";

const DEMO_SESSION_KEY = "kalinoo-demo-session";

const DEMO_CUSTOMER = {
  id: "demo-customer",
  fullName: "Demo Customer",
  email: "demo@kalinoo.com",
};

interface AuthContextValue {
  session: CustomerSession;
  isLoading: boolean;
  startDemoSession: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<CustomerSession>({
    mode: "guest",
    user: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      if (supabaseSession?.user) {
        // A real Supabase session always takes priority over demo mode.
        localStorage.removeItem(DEMO_SESSION_KEY);

        setSession({
          mode: "authenticated",
          user: {
            id: supabaseSession.user.id,
            email: supabaseSession.user.email ?? null,
          },
        });
      } else {
        // If there is no real user, check whether demo mode is active.
        const isDemo =
          localStorage.getItem(DEMO_SESSION_KEY) === "true";

        if (isDemo) {
          setSession({
            mode: "demo",
            user: DEMO_CUSTOMER,
          });
        } else {
          setSession({
            mode: "guest",
            user: null,
          });
        }
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function startDemoSession() {
    if (isLoading || session.mode === "authenticated") {
      return;
    }

    localStorage.setItem(DEMO_SESSION_KEY, "true");

    setSession({
      mode: "demo",
      user: DEMO_CUSTOMER,
    });
  }

  async function signOut() {
    if (session.mode === "authenticated") {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      return;
    }

    localStorage.removeItem(DEMO_SESSION_KEY);

    setSession({
      mode: "guest",
      user: null,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        startDemoSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}