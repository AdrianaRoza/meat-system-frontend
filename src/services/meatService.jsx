export async function createMeat(meat) {
  const res = await fetch("http://127.0.0.1:8000/meats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meat),
  });
  if (!res.ok) throw new Error("Erro ao criar carne");
  return await res.json();
}
