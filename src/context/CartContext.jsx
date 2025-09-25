import React, { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";

// 1. Criar o Contexto
const CartContext = createContext();

// 2. Criar o Provedor do Contexto
// Este componente irá envolver a sua aplicação e fornecer o estado do carrinho
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o item já existe no carrinho
      const isItemInCart = prevItems.find((item) => item.id === product.id);

      if (isItemInCart) {
        // Se existir, aumenta a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existir, adiciona ao carrinho com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product.nome} adicionado!`,
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });
  };

  // Função para remover um produto ou diminuir a quantidade
  const removeFromCart = (productId, removeOne = false) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      // Se for para remover apenas um e a quantidade for maior que 1
      if (removeOne && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove o item completamente
        return prevItems.filter((item) => item.id !== productId);
      }
    });
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // O valor que será compartilhado com os componentes filhos
  const value = { cartItems, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. Criar um Hook customizado para usar o contexto mais facilmente
export const useCart = () => {
  return useContext(CartContext);
};
