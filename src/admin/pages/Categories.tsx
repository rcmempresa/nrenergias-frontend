import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';

interface Category {
  id: number;
  nome: string;
  criada_em: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      setError('Erro ao carregar categorias.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!novaCategoria.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/categories/adicionar`, { nome: novaCategoria.trim() });
      setCategories(prev => [...prev, res.data].sort((a, b) => a.nome.localeCompare(b.nome)));
      setNovaCategoria('');
      setSuccessMessage('Categoria adicionada com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao adicionar categoria.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nome: string) => {
    if (!window.confirm(`Eliminar a categoria "${nome}"?`)) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/categories/eliminar/${id}`);
      setCategories(prev => prev.filter(c => c.id !== id));
      setSuccessMessage('Categoria eliminada com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao eliminar categoria.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Gestão de Categorias</h1>

      {successMessage && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md font-semibold">{successMessage}</div>
      )}
      {error && (
        <div className="p-4 bg-red-100 text-red-600 rounded-md">{error}</div>
      )}

      {/* Adicionar nova categoria */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Adicionar Nova Categoria</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Nome da nova categoria..."
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleAdd}
            disabled={loading || !novaCategoria.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            <PlusCircle size={18} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de categorias */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Categorias ({categories.length})</h3>
        </div>
        {categories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Sem categorias criadas.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criada em</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{cat.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{cat.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(cat.criada_em).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(cat.id, cat.nome)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 size={15} />
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
