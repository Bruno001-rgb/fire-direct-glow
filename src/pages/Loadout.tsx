import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadoutGrid from "@/components/loadout/LoadoutGrid";
import LoadoutSummary from "@/components/loadout/LoadoutSummary";
import { useLoadout } from "@/contexts/LoadoutContext";
import { Button } from "@/components/ui/button";
import { Crosshair } from "lucide-react";

export default function Loadout() {
  const { filledCount } = useLoadout();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container py-6 mt-14 sm:mt-16 pb-32">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Minha Lista</h1>
        <p className="text-muted-foreground mb-8">Escolha suas skins favoritas e envie pra gente encontrar.</p>

        {filledCount === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Crosshair className="size-16 text-muted-foreground mx-auto" />
            <p className="text-lg text-muted-foreground">Sua lista está vazia.</p>
            <p className="text-sm text-muted-foreground">Explore o catálogo e adicione as skins que você quer.</p>
            <Button variant="fire" asChild>
              <Link to="/catalogo">Explorar skins</Link>
            </Button>
          </div>
        ) : (
          <LoadoutGrid />
        )}
      </main>
      <LoadoutSummary />
      <Footer />
    </div>
  );
}
