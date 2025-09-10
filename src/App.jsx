import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Meats from './pages/Meats'
import Sales from './pages/Sales'


export default function App() {
  return (
    <Router>
      <nav className="bg-blue-600 p-4 text-white flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/meats" className="hover:underline">Carnes</Link>
        <Link to="/sales" className="hover:underline">Vendas</Link>
        <Link to="/restocks" className="hover:underline">Reabastecimentos</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meats" element={<Meats />} />
          <Route path="/sales" element={<Sales/>} />
          
          
        </Routes>
      </main>
    </Router>
  )
}
