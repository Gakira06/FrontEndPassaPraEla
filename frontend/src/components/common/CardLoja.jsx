import Bermuda from "../../assets/bermudaPassaAbola.png";
import Bone from "../../assets/bonePassaAbola.png";
import BlusaF from "../../assets/blusaFemininaPassaAbola.png";
import BlusaM from "../../assets/blusaPassaAbola.png";
import Calca from "../../assets/calcaPassaAbola.png";
import RoupaTime from "../../assets/roupaTimePassaAbola.png";
import { useCart } from "../../context/CartContext"; // Importando nosso hook

export default function CardLoja() {
  const { addToCart } = useCart(); // Pegando a função do contexto

  const produtos = [
    {
      id: 1,
      nome: "Bermuda Maculina",
      preco: "R$ 69,99",
      imagem: Bermuda,
    },
    {
      id: 2,
      nome: "Boné",
      preco: "R$ 59,90",
      imagem: Bone,
    },
    {
      id: 3,
      nome: "Blusa Feminina",
      preco: "R$ 150,00",
      imagem: BlusaF,
    },
    {
      id: 4,
      nome: "Moletom Masculino",
      preco: "R$ 250,00",
      imagem: BlusaM,
    },
    {
      id: 5,
      nome: "Calça Moletom Uni sex",
      preco: "R$ 199,90",
      imagem: Calca,
    },
    {
      id: 6,
      nome: "Conjunto de Treino",
      preco: "R$ 299,99",
      imagem: RoupaTime,
    },
  ];

  return (
    <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="border p-4 rounded-lg shadow-lg bg-white flex flex-col "
        >
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full h-89 object-cover mb-4 rounded-md bg-[linear-gradient(to_right,#3b0764,#c71585)]"
          />
          <h3 className="text-lg font-semibold mb-2">{produto.nome}</h3>
          <p className="text-xl font-bold text-purple-700">{produto.preco}</p>
          <button
            onClick={() => addToCart(produto)}
            className="mt-auto bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </section>
  );
}
