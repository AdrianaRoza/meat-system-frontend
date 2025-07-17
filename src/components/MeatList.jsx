import { useState, useEffect } from "react";

export default function MeatList() {
  const [meats, setMeats] = useState([]);

  useEffect(() => {
    // simulacao
    const dadosFalsos = [
      { id: 1, name: "Picanha", type: "Bovina", price_per_kg: 60.5, stock_kg: 10 },
      { id: 2, name: "Alcatra", type: "Bovina", price_per_kg: 45.0, stock_kg: 15 },
    ];
    setMeats(dadosFalsos);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {meats.map((meat) => (
        <div key={meat.id} className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{meat.name}</h2>
          <p>Tipo: {meat.type}</p>
          <p>Preço por Kg: R$ {meat.price_per_kg}</p>
          <p>Estoque: {meat.stock_kg} Kg</p>
        </div>
      ))}
    </div>
  );
}
