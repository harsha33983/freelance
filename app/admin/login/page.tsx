"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock } from "lucide-react";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.message || "Login failed"); return; }

      // Store token in localStorage (AdminShell reads it)
      localStorage.setItem("bgvm_admin_token", json.token);
      router.replace("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-footer flex items-center justify-center px-4">
      {/* Background Om */}
      
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-gold-lg overflow-hidden">
        <div className="h-1 bg-gold-gradient w-full" />
        <div className="p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-gold" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-ink">Admin Login</h1>
            <p className="text-ink-muted text-xs font-sans mt-1 tracking-widest uppercase">
              Bhagavad Gita Vishwa Mahotsav 2027
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm font-sans text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="admin@bgvmahotsav2027.org"
                className="w-full border border-gray-200 rounded-sm px-4 py-3 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold font-sans text-ink tracking-wider uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-sm px-4 py-3 pr-11 text-ink-body text-sm font-sans focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold justify-center py-3"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
