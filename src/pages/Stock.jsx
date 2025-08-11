import { useEffect, useState } from "react"
import Header from "../components/Header"
import Button from "../components/Button"
import Modal from "../components/Modal"

export default function Stock({ onBack }) {
  const [meats, setMeats] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price_per_kg: "",
    stock_kg: ""
  })

  // Função para buscar carnes do backend
  async function fetchMeats() {
    try {
      const res = await fetch("http://localhost:8000/meats/")
      const data = await res.json()
      setMeats(data)
    } catch (error) {
      console.error("Erro ao buscar carnes:", error)
    }
  }

  useEffect(() => {
    fetchMeats()
  }, [])

  // Função para abrir modal e resetar formulário
  function openModal() {
    setFormData({
      name: "",
      type: "",
      price_per_kg: "",
      stock_kg: ""
    })
    setIsModalOpen(true)
  }

  // Função para fechar modal
  function closeModal() {
    setIsModalOpen(false)
  }

  // Função para controlar mudanças no formulário
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Função para enviar dados para backend e adicionar carne
  async function handleSubmit(e) {
    e.preventDefault()

    // Validar campos simples
    if (!formData.name || !formData.type || !formData.price_per_kg || !formData.stock_kg) {
      alert("Preencha todos os campos!")
      return
    }

    // Montar payload com tipos corretos
    const payload = {
      name: formData.name,
      type: formData.type,
      price_per_kg: parseFloat(formData.price_per_kg),
      stock_kg: parseFloat(formData.stock_kg)
    }

    try {
      const res = await fetch("http://localhost:8000/meats/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert("Erro: " + errorData.detail)
        return
      }

      // Atualizar lista após cadastro
      fetchMeats()
      closeModal()
    } catch (error) {
      alert("Erro ao cadastrar carne")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header title="Carnes em Estoque" />
      <main className="max-w-3xl mx-auto p-6">
        <Button onClick={onBack} className="mb-4">← Voltar</Button>
        <Button onClick={openModal} className="mb-6">Cadastrar Carne</Button>

        {meats.length === 0 ? (
          <p>Nenhuma carne cadastrada.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-200">
                <th className="border border-gray-300 p-2 text-left">Nome</th>
                <th className="border border-gray-300 p-2 text-left">Tipo</th>
                <th className="border border-gray-300 p-2 text-right">Preço / kg</th>
                <th className="border border-gray-300 p-2 text-right">Estoque (kg)</th>
              </tr>
            </thead>
            <tbody>
              {meats.map(meat => (
                <tr key={meat.id} className="hover:bg-orange-100">
                  <td className="border border-gray-300 p-2">{meat.name}</td>
                  <td className="border border-gray-300 p-2">{meat.type}</td>
                  <td className="border border-gray-300 p-2 text-right">R$ {meat.price_per_kg.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2 text-right">{meat.stock_kg.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="text-lg font-semibold mb-4">Cadastrar Nova Carne</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="type"
              placeholder="Tipo"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              step="0.01"
              name="price_per_kg"
              placeholder="Preço por kg"
              value={formData.price_per_kg}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              step="0.01"
              name="stock_kg"
              placeholder="Estoque (kg)"
              value={formData.stock_kg}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={closeModal} className="bg-gray-400 hover:bg-gray-600">Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  )
}
