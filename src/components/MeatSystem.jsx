import { useState } from "react"
import MeatForm from "./MeatForm"
import MeatList from "./MeatList"

const MeatSystem = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingMeat, setEditingMeat] = useState(null);
  const [refreshSignal, setRefreshSignal] = useState(0); // para disparar recarga da lista

  const openNewForm = () => {
    setEditingMeat(null)
    setShowForm(true)
  }

  const openEditForm = (meat) => {
    setEditingMeat(meat)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingMeat(null)
  }

  // Depois de salvar (novo ou editar), fecha modal e atualiza lista
  const handleSave = () => {
    closeForm()
    setRefreshSignal((prev) => prev + 1) // incrementa para atualizar lista
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen relative">
      {/* Botão fixo no canto superior direito */}
      <button
        onClick={openNewForm}
        className="fixed top-6 right-6 bg-orange-500 text-white px-4 py-2 
          rounded shadow-md hover:bg-orange-600 transition z-50"
      >
        Cadastrar Carne
      </button>

      {/* Modal do formulário */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex 
            justify-center items-center z-50"
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg z-50"
          >
            <MeatForm
              editingMeat={editingMeat}
              onSave={handleSave}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}

      {/* Lista de carnes */}
      <MeatList refreshSignal={refreshSignal} onEdit={openEditForm} />
    </div>
  )
}

export default MeatSystem
