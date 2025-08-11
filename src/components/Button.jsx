 const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  )
}
export default Button
