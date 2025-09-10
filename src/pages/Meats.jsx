import { useState, useEffect } from "react"
import MeatList from "../components/MeatList"
import MeatForm from "../components/MeatForm"

export default function Meats() {
  const [meats, setMeats] = useState([]);
  const [showForm, setShowForm] = useState(false)

  const fetchMeats = async () => {
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

  const handleAddMeat = (newMeat) => {
    setMeats((prev) => [...prev, newMeat])
    setShowForm(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Carnes em Estoque</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 
            rounded hover:bg-blue-600"
          onClick={() => setShowForm(true)}
        >
          Cadastrar Carne
        </button>
      </div>

      <MeatList meats={meats} />

      {showForm && (
        <MeatForm
          onClose={() => setShowForm(false)}
          onAdd={handleAddMeat}
        />
      )}
    </div>
  )
}
