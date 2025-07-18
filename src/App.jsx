import { useState } from "react"
import MeatSystem from "./components/MeatSystem"

const App = () => {
  const [refreshSignal, setRefreshSignal] = useState(0)

  const handleSaved = () => {
    // incrementa sinal para atualizar lista
    setRefreshSignal((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <MeatSystem />
    </div>
  )
}

export default App
