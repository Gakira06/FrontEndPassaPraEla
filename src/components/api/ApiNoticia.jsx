import React, { useState, useEffect } from "react";

export default function ApiNoticia() {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

  // --- NOVA ESTRATÉGIA DE BUSCA ---
  // Em vez de um termo genérico, buscamos por campeonatos e ligas femininas famosas.
  // Isso garante resultados muito mais relevantes.
  const QUERY = '"Brasileirão Feminino" OR "NWSL" OR "Liga F" OR "FA WSL" OR "Champions League Feminina"';
  
  const LANGUAGE = "pt";
  const CATEGORY = "sports";
  // A URL agora usa a nova query
  const API_URL = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    QUERY
  )}&lang=${LANGUAGE}&category=${CATEGORY}&apikey=${API_KEY}`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      if (!API_KEY) {
        setError(
          "Chave da GNews API não configurada. Verifique o arquivo .env"
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.errors) {
             throw new Error(errorData.errors[0]);
          }
          throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Com a nova query, não precisamos mais do filtro manual.
        // A própria API nos dará resultados muito melhores.
        setArticles(data.articles.slice(0, 6));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [API_URL, API_KEY]);

  if (loading) {
    return (
      <div className="text-center text-2xl mt-8 text-gray-600">
        Carregando notícias... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-lg mt-8 text-red-600 p-4 bg-red-100 rounded-md">
        <strong>Erro ao buscar notícias:</strong> {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl my-8 mx-auto px-4 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Últimas Notícias do Futebol Feminino
      </h1>

      {articles.length === 0 && !loading ? (
        <p className="text-center text-gray-500">
          Nenhuma notícia foi encontrada.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.url}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  <span>Imagem não disponível</span>
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  {article.title}
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed my-2 flex-1">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline mt-4 self-start"
                >
                  Leia mais na fonte ({article.source.name})
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}