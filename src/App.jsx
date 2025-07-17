import { useState } from "react"
import MeatForm from "./components/MeatForm"
import MeatList from "./components/MeatList"

const App = () => {
  const [refreshSignal, setRefreshSignal] = useState(0)

  const handleSaved = () => {
    // incrementa sinal para atualizar lista
    setRefreshSignal((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <MeatForm onSave={handleSaved} />
      <MeatList refreshSignal={refreshSignal} />
    </div>
  )
}

export default App
