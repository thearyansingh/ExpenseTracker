"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { tokenStore } from "@/lib/auth-token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAccessToken = useCallback((token) => {
    tokenStore.set(token);
    setAccessTokenState(token);
  }, []);

  const clearAuth = useCallback(() => {
    tokenStore.clear();
    setAccessTokenState(null);
    setUser(null);
  }, []);

  const fetchMe = useCallback(async () => {
    const res = await api.get("/api/auth/me");
    setUser(res.data.user);
    return res.data.user;
  }, []);

  const refreshAccessToken = useCallback(async () => {
    const res = await api.post("/api/auth/refresh-token");
    const token = res.data.accessToken;
    setAccessToken(token);
    return token;
  }, [setAccessToken]);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      // Even if the API call fails, still clear client-side auth
      console.error("Logout API error:", error);
    } finally {
      clearAuth();
      router.replace("/login");
    }
  }, [clearAuth, router]);

  useEffect(() => {
    tokenStore.setRefreshHandler(refreshAccessToken);
    tokenStore.setLogoutHandler(logout);
  }, [refreshAccessToken, logout]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const token = await refreshAccessToken();
        if (!cancelled && token) {
          await fetchMe();
        }
      } catch {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [refreshAccessToken, fetchMe, clearAuth]);

  const login = useCallback(
    async (email, password) => {
      const res = await api.post("/api/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      return res.data;
    },
    [setAccessToken]
  );

  const register = useCallback(
    async (payload) => {
      const res = await api.post("/api/auth/register", payload);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);
      return res.data;
    },
    [setAccessToken]
  );

  const updateIncome = useCallback(
    async (monthlyIncome) => {
      const res = await api.put("/api/auth/updateIncome", { monthlyIncome });
      setUser(res.data.user);
      return res.data.user;
    },
    []
  );

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      isAuthenticated: Boolean(user && accessToken),
      login,
      register,
      logout,
      refreshAccessToken,
      updateIncome,
      fetchMe,
    }),
    [
      user,
      accessToken,
      loading,
      login,
      register,
      logout,
      refreshAccessToken,
      updateIncome,
      fetchMe,
    ]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
