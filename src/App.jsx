import Layout from "./components/Layout"
import MeatList from "./components/MeatList"
import MeatForm from "./components/MeatForm"
const App = () => {
  return (
    <Layout>
      <p className="text-center text-gray-700">Em breve a lista de carnes vai aparecer aqui!</p>
      <MeatForm/>
      {/* <MeatList/> */}
    </Layout>
  )
}

export default App;
 