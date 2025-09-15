import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormsPage from "./pages/FormsPage";
import RegrasPage from "./pages/RegrasPage";
import Cadastrese from "./pages/Cadastrese";
import FormsPageGame from "./pages/FormsPageGame";
import TeamsPage from "./pages/TeamsPage";
import MarketPage from "./pages/MarketPage";
import { TeamProvider } from "./context/TeamContext";

function App() {
  return (
    <Router>
      <TeamProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadastrese" element={<Cadastrese />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/regras" element={<RegrasPage />} />
          <Route path="/forms-game" element={<FormsPageGame />} />


          {/* Todas as rotas abaixo têm acesso aos dados do TeamProvider */}
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/marketplace" element={<MarketPage />} />
          <Route path="/team" element={<TeamsPage />} /> {/* Se necessário, ajuste os paths */}
          <Route path="/market" element={<MarketPage />} />
        </Routes>
      </TeamProvider>
    </Router>
  );
}

export default App;
