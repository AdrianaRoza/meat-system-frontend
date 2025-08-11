import { useState } from "react"
import Home from "./pages/Home"
import Stock from "./pages/Stock"
import Restock from "./pages/Restock"
import Sales from "./pages/Sales"

export default function App() {
  const [page, setPage] = useState("home")

  function renderPage() {
    switch (page) {
      case "stock":
        return <Stock onBack={() => setPage("home")} />
      case "restock":
        return <Restock onBack={() => setPage("home")} />
      case "sales":
        return <Sales onBack={() => setPage("home")} />
      default:
        return <Home onNavigate={setPage} />
    }
  }

  return renderPage()
}
