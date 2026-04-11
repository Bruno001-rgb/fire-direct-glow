import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Info, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginAttempt {
  id: string;
  email: string;
  success: boolean;
  failure_reason: string | null;
  user_agent: string | null;
  created_at: string;
}

const ITEMS_PER_PAGE = 20;

export default function LoginLogsViewer() {
  const [logs, setLogs] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async () => {
    setLoading(true);
    setCurrentPage(1);
    const { data } = await supabase
      .from("admin_login_attempts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLogs((data as LoginAttempt[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLogs(); }, []);

  const totalPages = Math.max(1, Math.ceil(logs.length / ITEMS_PER_PAGE));
  const paginatedLogs = logs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  };

  const truncateUA = (ua: string | null) => {
    if (!ua) return "—";
    return ua.length > 60 ? ua.slice(0, 60) + "…" : ua;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Últimos 500 registros.</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5 shrink-0" />
          Registros com mais de 90 dias são apagados automaticamente.
        </p>
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : logs.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Nenhum registro encontrado.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>User Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap text-xs">{formatDate(log.created_at)}</TableCell>
                  <TableCell className="text-xs">{log.email}</TableCell>
                  <TableCell>
                    <Badge variant={log.success ? "default" : "destructive"} className="text-xs">
                      {log.success ? "OK" : "Falha"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{log.failure_reason || "—"}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate" title={log.user_agent || ""}>
                    {truncateUA(log.user_agent)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4 mr-1" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
