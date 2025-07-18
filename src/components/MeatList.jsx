import { useEffect, useState } from "react";

const MeatList = ({ refreshSignal, onEdit }) => {
  const [meats, setMeats] = useState([]);

  const loadMeats = async () => {
    try {
      const res = await fetch("http://localhost:8000/meats");
      if (!res.ok) throw new Error("Erro ao buscar carnes");
      const data = await res.json();
      setMeats(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar carnes");
    }
  };

  useEffect(() => {
    loadMeats();
  }, [refreshSignal]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/meats/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar carne");
      loadMeats();
    } catch (error) {
      console.error(error);
      alert("Erro ao remover carne");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Carnes disponíveis
      </h2>
      {meats.length === 0 ? (
        <p>Nenhuma carne cadastrada.</p>
      ) : (
        <ul>
          {meats.map((meat) => (
            <li
              key={meat.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-800">
                <span className="font-bold text-orange-600">{meat.name}</span>
                <span className="italic">{meat.type}</span>
                <span className="text-gray-700">Estoque: {meat.stock_kg}kg</span>
                <span className="text-green-600 font-medium">
                  R$ {meat.price_per_kg.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(meat)}
                  className="bg-blue-500 text-white px-3 py-1 rounded 
                    hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(meat.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded 
                    hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MeatList
