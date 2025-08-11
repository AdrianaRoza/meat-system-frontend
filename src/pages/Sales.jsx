import { useEffect, useState } from "react"
import Header from "../components/Header"
import Button from "../components/Button"
import Modal from "../components/Modal"

export default function Sales({ onBack }) {
  const [sales, setSales] = useState([])
  const [meats, setMeats] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    meat_id: "",
    quantity_kg: ""
  })
  const [errorMsg, setErrorMsg] = useState("")

  // Buscar vendas
  async function fetchSales() {
    try {
      const res = await fetch("http://localhost:8000/sales/")
      const data = await res.json()
      setSales(data)
    } catch (error) {
      console.error("Erro ao buscar vendas:", error)
    }
  }

  // Buscar carnes para select
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
    fetchSales()
    fetchMeats()
  }, [])

  // Abrir modal e resetar form e erros
  function openModal() {
    setFormData({ meat_id: "", quantity_kg: "" })
    setErrorMsg("")
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Enviar venda para backend
  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.meat_id || !formData.quantity_kg) {
      setErrorMsg("Preencha todos os campos")
      return
    }

    const payload = {
      meat_id: parseInt(formData.meat_id),
      quantity_kg: parseFloat(formData.quantity_kg)
    }

    try {
      const res = await fetch("http://localhost:8000/sales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const err = await res.json()
        setErrorMsg(err.detail || "Erro ao registrar venda")
        return
      }

      fetchSales()
      closeModal()
    } catch (error) {
      setErrorMsg("Erro ao registrar venda")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header title="Vendas de Carnes" />
      <main className="max-w-3xl mx-auto p-6">
        <Button onClick={onBack} className="mb-4">← Voltar</Button>
        <Button onClick={openModal} className="mb-6">Registrar Venda</Button>

        {sales.length === 0 ? (
          <p>Nenhuma venda registrada.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-orange-200">
                <th className="border border-gray-300 p-2 text-left">Carne</th>
                <th className="border border-gray-300 p-2 text-right">Quantidade (kg)</th>
                <th className="border border-gray-300 p-2 text-right">Preço Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => {
                const meatName = meats.find(m => m.id === sale.meat_id)?.name || "Desconhecido"
                return (
                  <tr key={sale.id} className="hover:bg-orange-100">
                    <td className="border border-gray-300 p-2">{meatName}</td>
                    <td className="border border-gray-300 p-2 text-right">{sale.quantity_kg.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2 text-right">R$ {sale.total_price.toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3 className="text-lg font-semibold mb-4">Registrar Nova Venda</h3>
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

            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

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
