import { useState } from "react"

export default function MeatForm({ onClose, onAdd }) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [pricePerKg, setPricePerKg] = useState("")
  const [stockKg, setStockKg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const meatData = {
      name,
      type,
      price_per_kg: parseFloat(pricePerKg),
      stock_kg: parseFloat(stockKg),
    }

    try {
      const res = await fetch("http://localhost:8000/meats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(meatData),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar carne")

      const data = await res.json()
      console.log("Carne cadastrada:", data)
      onAdd(data)
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex 
        justify-center items-center"
      >
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded p-6 w-96 shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">Cadastrar Carne</h3>

        <label className="block mb-2">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Tipo:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-2">
          Preço por kg:
          <input
            type="number"
            step="0.01"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <label className="block mb-4">
          Estoque (kg):
          <input
            type="number"
            step="0.01"
            value={stockKg}
            onChange={(e) => setStockKg(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded 
              hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}
