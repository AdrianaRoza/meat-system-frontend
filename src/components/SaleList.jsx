export default function SaleList({ sales }) {
  if (sales.length === 0) {
    return <p className="text-gray-500">Nenhuma venda registrada ainda.</p>
  }

  return (
    <ul className="space-y-2">
      {sales.map((sale) => (
        <li
          key={sale.id}
          className="border rounded p-3 shadow-sm bg-white flex 
            justify-between"
        >
          <span>
            <strong>{sale.meat.name}</strong> - {sale.quantity_kg.toFixed(2)} kg
          </span>
          <span className="font-bold text-green-600">
            R$ {sale.total_price ? sale.total_price.toFixed(2) : "0.00"}
          </span>
        </li>
      ))}
    </ul>
  )
}
