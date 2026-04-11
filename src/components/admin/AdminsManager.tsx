import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Trash2, ArrowRightLeft, Shield, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface AdminEntry {
  user_id: string;
  email: string;
  is_super: boolean;
}

export default function AdminsManager() {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const isSuperAdmin = admins.find((a) => a.user_id === user?.id)?.is_super ?? false;

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admins", {
        body: { action: "list" },
      });
      if (error) throw error;
      setAdmins(data.admins || []);
    } catch (e: any) {
      toast.error("Erro ao carregar admins: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAdd = async () => {
    if (!email.trim()) return;
    setAdding(true);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admins", {
        body: { action: "add", email: email.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      toast.success("Admin adicionado!");
      setEmail("");
      fetchAdmins();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admins", {
        body: { action: "remove", user_id: userId },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      toast.success("Admin removido!");
      fetchAdmins();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTransfer = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data, error } = await supabase.functions.invoke("manage-admins", {
        body: { action: "transfer", user_id: userId },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      toast.success("Cargo de Super Admin transferido!");
      fetchAdmins();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {admins.length}/10 administradores
        </p>
      </div>

      {isSuperAdmin && (
        <div className="flex gap-2">
          <Input
            placeholder="Email do novo admin..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button onClick={handleAdd} disabled={adding || !email.trim()} size="sm">
            {adding ? <Loader2 className="size-4 animate-spin mr-1" /> : <Plus className="size-4 mr-1" />}
            Adicionar
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            {isSuperAdmin && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.user_id}>
              <TableCell className="font-mono text-sm">{admin.email}</TableCell>
              <TableCell>
                {admin.is_super ? (
                  <Badge variant="default" className="gap-1">
                    <ShieldCheck className="size-3" />
                    Super Admin
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="size-3" />
                    Admin
                  </Badge>
                )}
              </TableCell>
              {isSuperAdmin && (
                <TableCell className="text-right">
                  {admin.user_id !== user?.id && (
                    <div className="flex justify-end gap-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" disabled={actionLoading === admin.user_id}>
                            <ArrowRightLeft className="size-3 mr-1" />
                            Transferir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Transferir Super Admin?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Você perderá o cargo de Super Admin e {admin.email} assumirá. Esta ação não pode ser desfeita por você.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleTransfer(admin.user_id)}>
                              Confirmar transferência
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(admin.user_id)}
                        disabled={actionLoading === admin.user_id}
                      >
                        {actionLoading === admin.user_id ? (
                          <Loader2 className="size-3 animate-spin" />
                        ) : (
                          <Trash2 className="size-3" />
                        )}
                      </Button>
                    </div>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
