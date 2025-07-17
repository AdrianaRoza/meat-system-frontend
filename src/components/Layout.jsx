const  Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
        Seja bem vindo! 
      </h1>
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  )
}
export default Layout
