import { useState, useRef } from "react";
import { useTestimonials, type Testimonial } from "@/hooks/useTestimonials";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";

export default function TestimonialsManager() {
  const { data: testimonials, isLoading } = useTestimonials(false);
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("testimonials")
        .upload(path, file);
      if (uploadErr) throw uploadErr;

      const {
        data: { publicUrl },
      } = supabase.storage.from("testimonials").getPublicUrl(path);

      const maxOrder =
        testimonials && testimonials.length > 0
          ? Math.max(...testimonials.map((t) => t.sort_order))
          : -1;

      const { error: insertErr } = await supabase
        .from("testimonials")
        .insert({
          image_url: publicUrl,
          title: title.trim() || null,
          sort_order: maxOrder + 1,
        });
      if (insertErr) throw insertErr;

      toast.success("Depoimento adicionado!");
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      invalidate();
    } catch (err: any) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (t: Testimonial) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !t.is_active })
      .eq("id", t.id);
    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      invalidate();
    }
  };

  const remove = async (t: Testimonial) => {
    if (!confirm("Remover este depoimento?")) return;
    // Delete from storage
    const urlParts = t.image_url.split("/testimonials/");
    if (urlParts[1]) {
      await supabase.storage.from("testimonials").remove([urlParts[1]]);
    }
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", t.id);
    if (error) {
      toast.error(`Erro: ${error.message}`);
    } else {
      toast.success("Removido!");
      invalidate();
    }
  };

  const move = async (t: Testimonial, direction: "up" | "down") => {
    if (!testimonials) return;
    const sorted = [...testimonials].sort(
      (a, b) => a.sort_order - b.sort_order
    );
    const idx = sorted.findIndex((x) => x.id === t.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const other = sorted[swapIdx];
    await Promise.all([
      supabase
        .from("testimonials")
        .update({ sort_order: other.sort_order })
        .eq("id", t.id),
      supabase
        .from("testimonials")
        .update({ sort_order: t.sort_order })
        .eq("id", other.id),
    ]);
    invalidate();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sorted = [...(testimonials || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div className="border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-bold">Adicionar depoimento</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Título (opcional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-xs"
          />
          <label className="relative">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="sr-only"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin mr-1" />
              ) : (
                <Upload className="size-4 mr-1" />
              )}
              {uploading ? "Enviando…" : "Enviar imagem"}
            </Button>
          </label>
        </div>
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          Nenhum depoimento cadastrado.
        </p>
      ) : (
        <div className="grid gap-3">
          {sorted.map((t, i) => (
            <div
              key={t.id}
              className={`flex items-center gap-4 border rounded-lg p-3 ${
                t.is_active
                  ? "border-primary/20 bg-card/60"
                  : "border-border bg-muted/30 opacity-60"
              }`}
            >
              {/* Preview */}
              <img
                src={t.image_url}
                alt={t.title || "Depoimento"}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {t.title || "Sem título"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Ordem: {t.sort_order} •{" "}
                  {t.is_active ? "Ativo" : "Inativo"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => move(t, "up")}
                  disabled={i === 0}
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => move(t, "down")}
                  disabled={i === sorted.length - 1}
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => toggleActive(t)}
                >
                  {t.is_active ? (
                    <Eye className="size-4 text-primary" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-destructive hover:text-destructive"
                  onClick={() => remove(t)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
