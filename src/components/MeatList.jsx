import { useEffect, useState } from "react"

const MeatList = ({ refreshSignal }) => {
  const [meats, setMeats] = useState([])

  const loadMeats = async () => {
    try {
      const res = await fetch("http://localhost:8000/meats")
      if (!res.ok) throw new Error("Erro ao buscar carnes")
      const data = await res.json()
      setMeats(data)
    } catch (error) {
      console.error(error)
      alert("Erro ao carregar carnes")
    }
  }

  useEffect(() => {
    loadMeats();
  }, [refreshSignal]); // recarrega quando refreshSignal muda

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/meats/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar carne")
      // Recarrega a lista após deletar
      loadMeats()
    } catch (error) {
      console.error(error);
      alert("Erro ao remover carne")
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Carnes Salvas</h2>
      {meats.length === 0 ? (
        <p>Nenhuma carne cadastrada.</p>
      ) : (
        <ul>
          {meats.map((meat) => (
            <li
              key={meat.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <strong>{meat.name}</strong> — {meat.type} — Estoque: {meat.stock_kg}kg — R$ {meat.price_per_kg.toFixed(2)}
              </div>
              <button
                onClick={() => handleDelete(meat.id)}
                className="bg-red-500 text-white px-3 py-1 rounded 
                  hover:bg-red-600"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MeatList
