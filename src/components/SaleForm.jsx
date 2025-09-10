import { useState, useEffect } from "react"

export default function SaleForm({ onClose, onAdd }) {
  const [meats, setMeats] = useState([])
  const [meatId, setMeatId] = useState("")
  const [quantity, setQuantity] = useState("")

  // Buscar carnes disponíveis
  useEffect(() => {
    const fetchMeats = async () => {
      const res = await fetch("http://localhost:8000/meats/")
      const data = await res.json()
      setMeats(data)
    }
    fetchMeats()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8000/sales/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meat_id: parseInt(meatId, 10),
          quantity_kg: parseFloat(quantity),
        })
      })

      const newSale = await res.json()
      onAdd(newSale)
    } catch (error) {
      console.error("Erro ao registrar venda:", error)
    }
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center
      bg-black bg-opacity-30">
      <div 
        className="bg-white p-6 rounded shadow-md w-96">
        <h3 
          className="text-lg font-bold mb-4">
            Registrar Venda
        </h3>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4">
          {/* Selecionar carne */}
          <select
            value={meatId}
            onChange={(e) => setMeatId(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecione a carne</option>
            {meats.map((meat) => (
              <option key={meat.id} value={meat.id}>
                {meat.name} (R$ {meat.price_per_kg}/kg)
              </option>
            ))}
          </select>

          {/* Quantidade */}
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantidade em kg"
            required
            className="w-full border rounded px-3 py-2"
          />

          {/* Botões */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white 
                hover:bg-green-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
