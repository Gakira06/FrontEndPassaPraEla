import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormsPage from "./pages/FormsPage";
import RegrasPage from "./pages/RegrasPage";
import Cadastrese from "./pages/Cadastrese";
import FormsPageGame from "./pages/FormsPageGame";
import Loja from "./pages/Loja";
import CarrinhoDeCompras from "./pages/CarrinhoDeCompras";
import TeamsPage from "./pages/TeamsPage";
import MarketPage from "./pages/MarketPage";
import { TeamProvider } from "./context/TeamContext"; // Já existente
import { CartProvider } from "./context/CartContext"; // Nosso novo provider
import AdminDashboard from "./pages/AdiminDashboard";
import Planos from "./pages/Planos";
import RankingPage from "./pages/RankingPage";
import Sobre from "./pages/Sobre";

function App() {
  return (
    <Router>
      <CartProvider>
        <TeamProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/cadastrese" element={<Cadastrese />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/regras" element={<RegrasPage />} />
            <Route path="/forms-game" element={<FormsPageGame />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/carrinhoDecompras" element={<CarrinhoDeCompras />} />
            {/* Todas as rotas abaixo têm acesso aos dados do TeamProvider */}
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/marketplace" element={<MarketPage />} />
            <Route path="/team" element={<TeamsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/ranking" element={<RankingPage />} />
          </Routes>
        </TeamProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
