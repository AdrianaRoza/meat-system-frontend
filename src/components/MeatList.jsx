export default function MeatList({ meats }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="border px-4 py-2">Nome</th>
          <th className="border px-4 py-2">Tipo</th>
          <th className="border px-4 py-2">Preço/kg</th>
          <th className="border px-4 py-2">Estoque (kg)</th>
        </tr>
      </thead>
      <tbody>
        {meats?.map((meat) => (
          <tr key={meat.id} className="text-center border-b hover:bg-blue-100">
            <td className="border px-4 py-2">{meat.name}</td>
            <td className="border px-4 py-2">{meat.type}</td>
            <td className="border px-4 py-2">R$ {meat.price_per_kg?.toFixed(2) ?? "0.00"}</td>
            <td className="border px-4 py-2">{meat.stock_kg?.toFixed(2) ?? "0.00"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
