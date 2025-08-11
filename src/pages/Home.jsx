import Button from "../components/Button"
import Header from "../components/Header"


 const Home = ({ onNavigate }) => {
  // Aqui podemos controlar o botão de cadastro flutuante mais pra frente

  return (
    <div className="min-h-screen bg-orange-50">
      <Header title="Meat System - Home" />
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">Choose an option:</h2>

        <div className="flex flex-col gap-4">
          <Button onClick={() => onNavigate("stock")}>Carnes em Estoque</Button>
          <Button onClick={() => onNavigate("restock")}>O que repor em estoque</Button>
          <Button onClick={() => onNavigate("sales")}>Quantidade de carnes vendidas</Button>
        </div>
      </main>
    </div>
  )
}
export default Home
