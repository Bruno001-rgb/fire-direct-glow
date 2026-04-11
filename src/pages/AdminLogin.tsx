import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, UserPlus } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
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
      setError("Você não tem permissão de administrador.");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    navigate("/admin", { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!signUpData.user) {
      setError("Erro ao criar conta.");
      setLoading(false);
      return;
    }

    // Call edge function to check if first admin and auto-assign
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;

      const res = await supabase.functions.invoke("manage-admins", {
        body: { action: "first-admin" },
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (res.error) {
        // Not the first admin - account created but no admin role
        setSuccess("Conta criada! Peça a um administrador para adicionar você como admin.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      const result = res.data;
      if (result?.first) {
        // First admin - auto-assigned
        navigate("/admin", { replace: true });
      } else {
        setSuccess("Conta criada! Peça a um administrador para adicionar você como admin.");
        await supabase.auth.signOut();
      }
    } catch {
      setSuccess("Conta criada! Peça a um administrador para adicionar você como admin.");
      await supabase.auth.signOut();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
            {mode === "login" ? (
              <Lock className="size-6 text-primary" />
            ) : (
              <UserPlus className="size-6 text-primary" />
            )}
          </div>
          <h1 className="text-xl font-bold text-foreground">
            {mode === "login" ? "Admin Login" : "Criar Conta"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Entre com suas credenciais de administrador"
              : "Crie sua conta para acessar o painel"}
          </p>
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              placeholder="admin@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-500 text-center">{success}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
            {mode === "login" ? "Entrar" : "Criar Conta"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setSuccess("");
            }}
          >
            {mode === "login"
              ? "Não tem conta? Criar conta"
              : "Já tem conta? Fazer login"}
          </button>
        </div>
      </div>
    </div>
  );
}
