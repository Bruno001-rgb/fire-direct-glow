import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const SOURCE_BADGES: Record<string, { label: string; className: string }> = {
  hero: { label: "Hero", className: "bg-blue-500/20 text-blue-400" },
  final_cta: { label: "CTA Final", className: "bg-primary/20 text-primary" },
  loadout: { label: "Loadout", className: "bg-green-500/20 text-green-400" },
};

export default function LeadsManager() {
  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        Nenhum lead recebido ainda.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Skin de interesse</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const badge = SOURCE_BADGES[lead.source] ?? {
              label: lead.source,
              className: "bg-muted text-muted-foreground",
            };
            return (
              <TableRow key={lead.id}>
                <TableCell className="font-mono text-sm">{lead.whatsapp}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {lead.skin_interest || "—"}
                </TableCell>
                <TableCell>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${badge.className}`}>
                    {badge.label}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(lead.created_at), "dd/MM/yyyy HH:mm")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
