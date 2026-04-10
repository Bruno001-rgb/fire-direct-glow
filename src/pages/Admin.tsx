import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Loader2, ArrowLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SlotManager from "@/components/admin/SlotManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import CatalogManager from "@/components/admin/CatalogManager";
// import AdminGuard from "@/components/admin/AdminGuard";
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <>
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
              <h1 className="text-lg font-bold">Admin — Vitrine</h1>
            </div>
            <div className="flex items-center gap-2">
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
                Sincronizar Skins
              </Button>
              <Button onClick={handleLogout} size="sm" variant="ghost">
                <LogOut className="size-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6">
          <Tabs defaultValue="skins">
            <TabsList className="mb-6">
              <TabsTrigger value="vitrine">Vitrine</TabsTrigger>
              <TabsTrigger value="catalogo">Catálogo</TabsTrigger>
              <TabsTrigger value="depoimentos">Depoimentos</TabsTrigger>
            </TabsList>

            <TabsContent value="vitrine">
              <p className="text-sm text-muted-foreground mb-6">
                Skins da página inicial. Aparecem automaticamente no catálogo.
              </p>
              <SlotManager />
            </TabsContent>

            <TabsContent value="catalogo">
              <p className="text-sm text-muted-foreground mb-6">
                Skins extras que aparecem apenas no catálogo.
              </p>
              <CatalogManager />
            </TabsContent>

            <TabsContent value="depoimentos">
              <p className="text-sm text-muted-foreground mb-6">
                Gerencie os prints/depoimentos exibidos na landing page.
              </p>
              <TestimonialsManager />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
