const API_URL = "http://localhost:8000/meats/"

export async function fetchMeats() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error("Erro ao buscar carnes")
  }
  return await response.json();
}

// Remover uma carne pelo ID
export async function deleteMeat(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar carne")
  }
}
