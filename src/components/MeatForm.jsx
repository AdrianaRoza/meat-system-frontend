import { useState } from "react"

const MeatForm = () => {

  const [form, setForm] = useState({
    name:"",
    type:"",
    price_per_kg:"",
    stock_kg:"",
  })

  return(
    <form>
      {/* Aqui Depois vao os inputs */}
    </form>
  )
}
export default MeatForm
