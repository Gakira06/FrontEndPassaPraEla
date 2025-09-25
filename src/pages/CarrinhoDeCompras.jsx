import { useCart } from "../context/CartContext";
import HeaderLoja from "../components/layout/HeaderLoja";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useState } from "react"; // Importe o useState
import Swal from "sweetalert2";

// Imports do Mercado Pago
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// Cole sua Public Key de TESTE aqui.
// Lembre-se que esta chave é segura para ser exposta no frontend.
initMercadoPago("Chave", {
  locale: "pt-BR",
});

export default function CarrinhoDeCompras() {
  // --- SEUS HOOKS E CÁLCULOS EXISTENTES (NENHUMA MUDANÇA AQUI) ---
  const { cartItems, addToCart, removeFromCart } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => {
      const price = parseFloat(item.preco.replace("R$ ", "").replace(",", "."));
      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);

  // --- NOVA LÓGICA PARA PAGAMENTO ---
  // 1. Estado para guardar o ID da preferência de pagamento
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 2. Função que chama seu backend para criar a preferência
  const handleCheckout = async () => {
    setIsLoading(true); // Ativa o estado de carregamento
    try {
      const response = await fetch("http://localhost:3001/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }), // O backend já recalcula o preço, então só precisamos dos itens
      });

      const data = await response.json();

      if (data.id) {
        setPreferenceId(data.id); // Guarda o ID recebido no estado
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao Gerar Pagamento",
          text: "Não foi possível gerar o link de pagamento. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      Swal.fire({
        icon: "error",
        title: "Erro de Conexão",
        text: "Não foi possível iniciar o checkout. Verifique o console para mais detalhes.",
      });
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderLoja />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Meu Carrinho ({totalItems} {totalItems === 1 ? "item" : "itens"})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">
              Seu carrinho está vazio.
            </p>
            <Link
              to="/loja"
              className="bg-purple-600 text-white py-3 px-6 rounded-full hover:bg-purple-700 transition-colors text-lg"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens (SEU CÓDIGO ORIGINAL) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.nome}</h2>
                    <p className="text-purple-700 font-bold">{item.preco}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.id, true)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-6 text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido (COM A NOVA LÓGICA DE BOTÃO) */}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Resumo do Pedido
              </h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal ({totalItems} itens)</span>
                <span>R$ {totalPrice.replace(".", ",")}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t pt-4">
                <span>Total</span>
                <span>R$ {totalPrice.replace(".", ",")}</span>
              </div>

              {/* --- 3. Lógica condicional para o botão de pagamento --- */}
              <div id="wallet_container" className="w-full mt-6">
                {!preferenceId ? (
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400"
                  >
                    {isLoading ? "Carregando..." : "Finalizar Compra"}
                  </button>
                ) : (
                  <Wallet initialization={{ preferenceId: preferenceId }} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
