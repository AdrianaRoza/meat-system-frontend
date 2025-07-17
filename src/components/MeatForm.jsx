import { useState } from "react"

const MeatForm = ({ onSave }) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    price_per_kg: "",
    stock_kg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8000/meats", {
        method: "POST",
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

      // Avisar o componente pai que salvou (para atualizar a lista)
      if (onSave) onSave(savedMeat)

      // Limpar formulário
      setForm({
        name: "",
        type: "",
        price_per_kg: "",
        stock_kg: "",
      });
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
      <h2 className="text-xl font-bold text-gray-700">Cadastrar Carne</h2>

      <input
        type="text"
        name="name"
        placeholder="Nome da Carne"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="type"
        placeholder="Tipo (bovina, suína...)"
        value={form.type}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

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
    </form>
  )
}

export default MeatForm
