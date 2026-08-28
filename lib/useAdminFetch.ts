"use client";

import { useEffect, useState, useCallback } from "react";

export function useAdminFetch<T>(url: string, options?: { enabled?: boolean }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(options?.enabled !== false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (options?.enabled === false) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("bgvm_admin_token") : null;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token ?? ""}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fetch error");
    } finally {
      setLoading(false);
    }
  }, [url, options?.enabled]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export async function adminFetch(url: string, options?: RequestInit) {
  const token = typeof window !== "undefined" ? localStorage.getItem("bgvm_admin_token") : null;
  const isFormData = options?.body instanceof FormData;
  const headers: HeadersInit = {
    Authorization: `Bearer ${token ?? ""}`,
    ...(options?.headers ?? {}),
  };
  
  if (!isFormData) {
    (headers as any)["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401 && typeof window !== "undefined") {
    window.location.href = "/admin/login";
  }

  return res;
}
