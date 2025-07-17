import { useState } from "react"

const MeatForm = () => {

  const [form, setForm] = useState({
    name:"",
    type:"",
    price_per_kg:"",
    stock_kg:"",
  })

  const handleChange = (e) => {
    const { name, value} = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://127.0.0.1:8000/meats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price_per_kg: parseFloat(form.price_per_kg),
          stock_kg: parseFloat(form.stock_kg),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        alert("Carne cadastrada com sucesso!")
        console.log("Resposta do backend:", data)
        setForm({ name: "", type: "", price_per_kg: "", stock_kg: "" })
      } else {
        const error = await response.json()
        alert("Erro ao cadastrar carne: " + JSON.stringify(error))
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error)
      alert("Erro ao conectar com o backend")
    }
  }

  return(
    <form
       onSubmit={handleSubmit}  
      className="space-y-4 p-4 bg-white shadow-md rounded max-w-md mx-auto"
    >
      <h2 
        className="text-xl font-bold text-gray-700">
          Cadastrar Carne
      </h2>

      <input 
        type="text"
        name="name"
        placeholder="Nome da Carne"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input 
        type="text"
        name="type"
        placeholder="Tipo (bovina, suína...)"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input 
        type="number"
        name="price_per_kg"
        placeholder="Preço por kg"
        value={form.price_per_kg}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />


      <input 
        type="number"
        name="stock_kg"
        placeholder="Estoque em kg"
        value={form.stock_kg}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded 
          hover:bg-green-700 transition"
      >
        Salvar Carne
      </button>

        {/* Teste de que esta funcionando */}
      <div className="mt-4 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold text-gray-700">Prévia dos dados:</h3>
        <p><strong>Nome:</strong> {form.name}</p>
        <p><strong>Tipo:</strong> {form.type}</p>
        <p><strong>Preço por kg:</strong> {form.price_per_kg}</p>
        <p><strong>Estoque em kg:</strong> {form.stock_kg}</p>
      </div>
      

    </form>
  )
}
export default MeatForm
