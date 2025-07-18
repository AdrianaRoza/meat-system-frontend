import { useState, useEffect } from "react"

const MeatForm = ({ onSave, onCancel, editingMeat }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price_per_kg: "",
    stock_kg: "",
  })

  // Carrega dados para editar ou limpa para novo
  useEffect(() => {
    if (editingMeat) {
      setForm({
        name: editingMeat.name,
        type: editingMeat.type,
        price_per_kg: editingMeat.price_per_kg,
        stock_kg: editingMeat.stock_kg,
      })
    } else {
      setForm({
        name: "",
        type: "",
        price_per_kg: "",
        stock_kg: "",
      })
    }
  }, [editingMeat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const method = editingMeat ? "PUT" : "POST"
      const url = editingMeat
        ? `http://localhost:8000/meats/${editingMeat.id}`
        : "http://localhost:8000/meats";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          price_per_kg: Number(form.price_per_kg),
          stock_kg: Number(form.stock_kg),
        }),
      })

      if (!res.ok) throw new Error("Erro ao salvar carne")

      const savedMeat = await res.json()

      if (onSave) onSave(savedMeat)
    } catch (error) {
      alert("Erro: " + error.message)
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">
        {editingMeat ? "Editar Carne" : "Cadastrar Carne"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nome da Carne"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Selecione o tipo</option>
        <option value="bovina">Bovina</option>
        <option value="suína">Suína</option>
        <option value="Aves">Aves</option>
        <option value="peixe">Peixe</option>
        <option value="outra">Outra</option>
      </select>

      <input
        type="number"
        step="0.01"
        name="price_per_kg"
        placeholder="Preço por kg"
        value={form.price_per_kg}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        step="0.01"
        name="stock_kg"
        placeholder="Estoque em kg"
        value={form.stock_kg}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded 
          hover:bg-green-700 transition"
      >
        Salvar Carne
      </button>

      <button
        type="button"
        onClick={onCancel}
        className="w-full bg-gray-300 text-gray-800 py-2 rounded 
          hover:bg-gray-400 transition mt-2"
      >
        Cancelar
      </button>
    </form>
  )
}

export default MeatForm
