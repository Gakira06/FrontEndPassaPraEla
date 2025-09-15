import React, { useState, useEffect } from "react";

function NoticiasFutebolFeminino() {
  // Usando variável de ambiente para a chave de API (RECOMENDADO)
  const API_KEY =
    import.meta.env.VITE_NEWS_API_KEY || "b55ba3c963cc4938a2866fa62cc655ef";
  const QUERY = "futebol feminino";
  const LANGUAGE = "pt";
  // Adicionado o parâmetro pageSize=6 para limitar os resultados
  const API_URL = `https://newsapi.org/v2/everything?q=${QUERY}&language=${LANGUAGE}&sortBy=publishedAt&pageSize=6&apiKey=${API_KEY}`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      if (!API_KEY || API_KEY === "SUA_CHAVE_DE_API_AQUI") {
        setError(
          "Chave de API não configurada. Por favor, adicione sua chave em um arquivo .env"
        );
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ${response.status}: ${errorData.message}`);
        }
        const data = await response.json();
        setArticles(data.articles);
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
        <strong>Erro:</strong> {error}
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
        // Container do Grid Responsivo
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            // Card da Notícia (agora um <article>)
            <article
              key={article.url}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  <span>Imagem não disponível</span>
                </div>
              )}

              {/* Container do conteúdo para alinhar o link no final */}
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

export default NoticiasFutebolFeminino;
