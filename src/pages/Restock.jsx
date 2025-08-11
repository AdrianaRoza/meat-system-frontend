import { useEffect, useState } from "react"
import Header from "../components/Header"
import Button from "../components/Button"
import Modal from "../components/Modal"

export default function Restock({ onBack }) {
  const [restocks, setRestocks] = useState([])
  const [meats, setMeats] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    meat_id: "",
    quantity_kg: ""
  })

  // Buscar reabastecimentos
  async function fetchRestocks() {
    try {
      const res = await fetch("http://localhost:8000/restocks/")
      const data = await res.json()
      setRestocks(data)
    } catch (error) {
      console.error("Erro ao buscar reabastecimentos:", error)
    }
  }

  // Buscar carnes para preencher select do modal
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
    fetchRestocks()
    fetchMeats()
  }, [])

  // Abrir modal e resetar form
  function openModal() {
    setFormData({
      meat_id: "",
      quantity_kg: ""
    })
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // Controlar mudanças no form
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Enviar novo reabastecimento para backend
  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.meat_id || !formData.quantity_kg) {
      alert("Preencha todos os campos")
      return
    }

    const payload = {
      meat_id: parseInt(formData.meat_id),
      quantity_kg: parseFloat(formData.quantity_kg)
    }

    try {
      const res = await fetch("http://localhost:8000/restocks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const err = await res.json()
        alert("Erro: " + err.detail)
        return
      }

      fetchRestocks()
      closeModal()
    } catch (error) {
      alert("Erro ao cadastrar reabastecimento")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header title="Reabastecimentos" />
      <main className="max-w-3xl mx-auto p-6">
        <Button onClick={onBack} className="mb-4">← Voltar</Button>
        <Button onClick={openModal} className="mb-6">Cadastrar Reabastecimento</Button>

        {restocks.length === 0 ? (
          <p>Nenhum reabastecimento registrado.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-200">
                <th className="border border-gray-300 p-2 text-left">Carne</th>
                <th className="border border-gray-300 p-2 text-right">Quantidade (kg)</th>
              </tr>
            </thead>
            <tbody>
              {restocks.map(r => {
                const meatName = meats.find(m => m.id === r.meat_id)?.name || "Desconhecido"
                return (
                  <tr key={r.id} className="hover:bg-orange-100">
                    <td className="border border-gray-300 p-2">{meatName}</td>
                    <td className="border border-gray-300 p-2 text-right">{r.quantity_kg.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="text-lg font-semibold mb-4">Cadastrar Reabastecimento</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select
              name="meat_id"
              value={formData.meat_id}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Selecione uma carne</option>
              {meats.map(meat => (
                <option key={meat.id} value={meat.id}>
                  {meat.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              step="0.01"
              name="quantity_kg"
              placeholder="Quantidade (kg)"
              value={formData.quantity_kg}
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
