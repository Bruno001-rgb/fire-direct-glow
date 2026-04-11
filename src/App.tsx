import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadoutProvider } from "@/contexts/LoadoutContext";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import Catalogo from "./pages/Catalogo.tsx";
import Loadout from "./pages/Loadout.tsx";
import TermosDeServico from "./pages/TermosDeServico.tsx";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadoutProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/loadout" element={<Loadout />} />
            <Route path="/termos" element={<TermosDeServico />} />
            <Route path="/privacidade" element={<PoliticaDePrivacidade />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LoadoutProvider>
  </QueryClientProvider>
);

export default App;
