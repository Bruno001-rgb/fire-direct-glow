import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface Credential {
  id: string;
  key: string;
  title: string;
  value: string;
  description: string;
  href: string | null;
  icon: string;
  sort_order: number;
}

export default function CredentialsManager() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchCredentials = async () => {
    const { data, error } = await supabase
      .from("site_credentials")
      .select("*")
      .order("sort_order");
    if (error) {
      toast.error("Erro ao carregar credenciais");
      return;
    }
    setCredentials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const updateField = (id: string, field: keyof Credential, value: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = async (credential: Credential) => {
    setSavingId(credential.id);
    const { error } = await supabase
      .from("site_credentials")
      .update({
        title: credential.title,
        value: credential.value,
        description: credential.description,
        href: credential.href || null,
      })
      .eq("id", credential.id);

    if (error) {
      toast.error("Erro ao salvar");
    } else {
      toast.success(`"${credential.title}" salvo!`);
    }
    setSavingId(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {credentials.map((cred) => (
        <div
          key={cred.id}
          className="rounded-lg border border-border p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              {cred.key}
            </span>
            <Button
              size="sm"
              onClick={() => handleSave(cred)}
              disabled={savingId === cred.id}
            >
              {savingId === cred.id ? (
                <Loader2 className="size-4 animate-spin mr-1" />
              ) : (
                <Save className="size-4 mr-1" />
              )}
              Salvar
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Título</Label>
              <Input
                value={cred.title}
                onChange={(e) => updateField(cred.id, "title", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Valor</Label>
              <Input
                value={cred.value}
                onChange={(e) => updateField(cred.id, "value", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Descrição</Label>
              <Input
                value={cred.description}
                onChange={(e) =>
                  updateField(cred.id, "description", e.target.value)
                }
              />
            </div>
            <div>
              <Label className="text-xs">Link (opcional)</Label>
              <Input
                value={cred.href || ""}
                onChange={(e) => updateField(cred.id, "href", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
