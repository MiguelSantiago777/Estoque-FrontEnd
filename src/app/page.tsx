"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react"; // Ícones profissionais
import { getProdutos, createProduto, updateProduto, deleteProduto } from "@/services/api";

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<any>(null);
  const [formData, setFormData] = useState({ nome: "", quantidade: 0 });

  const loadData = async () => {
    const data = await getProdutos();
    setProdutos(Array.isArray(data) ? data : []);
  };

  useEffect(() => { loadData(); }, []);

  const openModal = (produto: any = null) => {
    if (produto) {
      setEditingProduto(produto);
      setFormData({ nome: produto.nome, quantidade: produto.quantidade });
    } else {
      setEditingProduto(null);
      setFormData({ nome: "", quantidade: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduto) {
      await updateProduto(editingProduto.id, formData);
    } else {
      await createProduto(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja mesmo excluir este item?")) {
      await deleteProduto(id);
      loadData();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <main className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Estoque Pro</h1>
            <p className="text-zinc-500">Gerencie seus produtos em tempo real</p>
          </div>
          
          <button 
            onClick={() => openModal()}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-900/20"
          >
            <Plus size={20} /> ADICIONAR ITEM
          </button>
        </div>

        {/* TABELA - Um cinza levemente mais claro (zinc-900) que o fundo */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-800/50 border-b border-zinc-800">
                <th className="p-4 text-zinc-400 font-medium">Produto</th>
                <th className="p-4 text-zinc-400 font-medium">Quantidade</th>
                <th className="p-4 text-zinc-400 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {produtos.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-semibold text-zinc-200">{p.nome}</td>
                  <td className="p-4">
                    <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm border border-zinc-700">
                      {p.quantidade} unidades
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      {/* BOTÃO ATUALIZAR (AMARELO) */}
                      <button 
                        onClick={() => openModal(p)}
                        className="bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-black border border-yellow-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-black transition-all"
                      >
                        <Upload size={14} /> ATUALIZAR
                      </button>
                      
                      {/* BOTÃO DELETAR (VERMELHO) */}
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 p-2 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {produtos.length === 0 && (
            <div className="p-10 text-center text-zinc-500">Nenhum produto cadastrado.</div>
          )}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest text-zinc-100">
                  {editingProduto ? "Editar" : "Novo Item"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Nome do Produto</label>
                  <input 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: Teclado Mecânico"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase mb-2 block">Quantidade em Estoque</label>
                  <input 
                    type="number"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({...formData, quantidade: Number(e.target.value)})}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/30"
                >
                  {editingProduto ? "SALVAR ALTERAÇÕES" : "CADASTRAR PRODUTO"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}