import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logo from '/logo.png';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setError('');
  
    try {
      const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro ao fazer login');
      }
  
      // Captura o token da resposta e armazena no localStorage
      const data = await response.json();
      localStorage.setItem('token', data.token);
  
      navigate('/'); // Redireciona para a página inicial ou área autenticada
    } catch (error) {
      setError(error.message || 'Erro de conexão com o servidor');
    }
  };
  
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Digite a password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition duration-200"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Não tem uma conta?{' '}
            <a href="/register" className="text-blue-700 hover:underline">
              Registre-se aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
