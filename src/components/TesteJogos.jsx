import { useEffect, useState } from "react";

export default function TesteJogos() {
  const [dadosApi, setDadosApi] = useState(null);

  useEffect(() => {
    const token = import.meta.env.VITE_API_FUTEBOL_TOKEN;

    fetch("https://api.api-futebol.com.br/v1/campeonatos/30/fases/808", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta bruta da API:", data);
        setDadosApi(data);
      })
      .catch((err) => console.error("Erro ao buscar API:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Teste API Brasileirão Feminino</h1>
      <pre>{JSON.stringify(dadosApi, null, 2)}</pre>
      <p>
        Abra o console do navegador para ver todos os dados e os status reais das partidas.
      </p>
    </div>
  );
}
