import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';  // Importando o Header
import Footer from '../components/Footer';  // Importando o Footer

const CartPage = () => {
  // Simulação de um carrinho com produtos
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Produto 1', price: 20.0, quantity: 2 },
    { id: 2, name: 'Produto 2', price: 15.0, quantity: 1 },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  // Calcular o preço total
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Adicionando o Header */}
      <Header />

      <div className="mt-60 container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio!</p>
        ) : (
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-4">
              <ul>
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <span className="font-semibold">{item.name}</span>
                      <span className="ml-2 text-sm text-gray-500">R$ {item.price}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 text-sm mr-2"
                      >
                        Remover
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                        min="1"
                        className="w-12 p-1 border rounded"
                      />
                    </div>
                    <span className="ml-4 font-semibold">R$ {item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="mt-6 flex justify-between">
              <Link to="/produtos" className="text-blue-600">Continuar comprando</Link>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                onClick={() => alert('Proceder para o checkout')}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Adicionando o Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
