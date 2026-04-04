import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SlotManager from "@/components/admin/SlotManager";
import { toast } from "sonner";

export default function Admin() {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-skins");
      if (error) throw error;
      toast.success(`Sincronizado! ${data?.upserted || 0} skins importadas.`);
    } catch (e: any) {
      toast.error(`Erro ao sincronizar: ${e.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 mr-1" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-lg font-bold">Admin — Vitrine de Skins</h1>
          </div>
          <Button
            onClick={handleSync}
            disabled={syncing}
            size="sm"
            variant="outline"
          >
            {syncing ? (
              <Loader2 className="size-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="size-4 mr-1" />
            )}
            Sincronizar Skins da API
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <p className="text-sm text-muted-foreground mb-6">
          Selecione as skins que aparecem em cada categoria da landing page.
          Clique em "Sincronizar" primeiro para importar as skins da API.
        </p>
        <SlotManager />
      </main>
    </div>
  );
}
