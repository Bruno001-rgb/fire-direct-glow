import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, ShieldAlert } from "lucide-react";

const STORAGE_KEY = "admin_login_rl";
const LOCKOUT_TIERS = [
  { threshold: 5, duration: 30 },
  { threshold: 10, duration: 120 },
  { threshold: 15, duration: 300 },
];

function getStoredState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { attempts: 0, lockedUntil: 0 };
    return JSON.parse(raw) as { attempts: number; lockedUntil: number };
  } catch {
    return { attempts: 0, lockedUntil: 0 };
  }
}

function persistState(attempts: number, lockedUntil: number) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ attempts, lockedUntil }));
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [attempts, setAttempts] = useState(() => getStoredState().attempts);
  const [lockedUntil, setLockedUntil] = useState(() => getStoredState().lockedUntil);
  const [countdown, setCountdown] = useState(0);

  const isLocked = countdown > 0;

  useEffect(() => {
    const tick = () => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      setCountdown(remaining > 0 ? remaining : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const applyLockout = useCallback((newAttempts: number) => {
    let duration = 0;
    for (const tier of LOCKOUT_TIERS) {
      if (newAttempts >= tier.threshold) duration = tier.duration;
    }
    const until = duration > 0 ? Date.now() + duration * 1000 : 0;
    setAttempts(newAttempts);
    setLockedUntil(until);
    persistState(newAttempts, until);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || loading) return;

    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      const next = attempts + 1;
      applyLockout(next);
      setError("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const next = attempts + 1;
      applyLockout(next);
      setError("Erro ao verificar usuário.");
      setLoading(false);
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      const next = attempts + 1;
      applyLockout(next);
      setError("Você não tem permissão de administrador.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // Success — reset rate limit
    setAttempts(0);
    setLockedUntil(0);
    sessionStorage.removeItem(STORAGE_KEY);
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="size-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Entre com suas credenciais de administrador
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="admin@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLocked}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Senha</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLocked}
            />
          </div>

          {isLocked && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
              <ShieldAlert className="size-4 shrink-0" />
              <span>Muitas tentativas. Tente novamente em {countdown}s.</span>
            </div>
          )}

          {error && !isLocked && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading || isLocked}>
            {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
            {isLocked ? `Bloqueado (${countdown}s)` : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
