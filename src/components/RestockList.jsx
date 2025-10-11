import React, { useEffect, useState } from "react"

function RestockList({ reloadTrigger }) {
  const [restocks, setRestocks] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/restocks")
      .then((res) => res.json())
      .then((data) => setRestocks(data))
      .catch((err) => console.error("Erro ao buscar reabastecimentos:", err))
  }, [reloadTrigger]);

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3 text-center"
      >
        Histórico de Reabastecimentos
      </h2>
      <table 
        className="w-full border-collapse border border-gray-300 
            rounded-lg"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Carne</th>
            <th className="border p-2">Quantidade (kg)</th>
          </tr>
        </thead>
        <tbody>
          {restocks.map((r) => (
            <tr key={r.id}>
              <td className="border p-2 text-center">{r.id}</td>
              <td className="border p-2 text-center">{r.meat_id}</td>
              <td className="border p-2 text-center">{r.quantity_kg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RestockList
