import { useState, useEffect } from "react"
import RestockForm from "../components/RestockForm"
import RestockList from "../components/RestockList"

export default function Restock() {
  const [restocks, setRestocks] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const fetchRestocks = async () => {
      try {
        const res = await fetch("http://localhost:8000/restocks/")
        const data = await res.json()
        setRestocks(data)
      } catch (error) {
        console.error("Erro ao buscar reabastecimentos:", error)
      }
    }
    fetchRestocks()
  }, [])

  const handleAddRestock = (newRestock) => {
    setRestocks((prev) => [...prev, newRestock])
    setShowForm(false)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reabastecimentos</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Novo
        </button>
      </div>

      <RestockList restocks={restocks} />

      {showForm && (
        <RestockForm onClose={() => setShowForm(false)} onAdd={handleAddRestock} />
      )}
    </div>
  )
}
