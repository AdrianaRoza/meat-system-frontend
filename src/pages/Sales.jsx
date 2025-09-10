import { useState, useEffect } from "react"
import SaleList from "../components/SaleList"
import SaleForm from "../components/SaleForm"

export default function Sales() {
  const [sales, setSales] = useState([])
  const [showForm, setShowForm] = useState(false)

  // Buscar vendas do backend
  const fetchSales = async () => {
    try {
      const res = await fetch("http://localhost:8000/sales/")
      const data = await res.json()
      setSales(data)
    } catch (error) {
      console.error("Erro ao buscar vendas:", error)
    }
  };

  useEffect(() => {
    fetchSales()
  }, [])

  // Adicionar venda nova na lista
  const handleAddSale = (newSale) => {
    setSales((prev) => [...prev, newSale])
    setShowForm(false)
  };

  return (
    <div className="p-6">
      {/* Cabeçalho com botão */}
      <div className="flex justify-between items-center mb-4">

        <h2 
          className="text-2xl font-bold">
            Histórico de Vendas
        </h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded 
            hover:bg-green-600"
          onClick={() => setShowForm(true)}
        >
          Registrar Venda
        </button>
      </div>

      {/* Lista de vendas */}
      <SaleList sales={sales} />

      {/* Formulário de vendas */}
      {showForm && (
        <SaleForm
          onClose={() => setShowForm(false)}
          onAdd={handleAddSale}
        />
      )}
    </div>
  )
}
