const API_URL = "http://127.0.0.1:8000/meats"

export async function createMeat(meat) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meat),
  });
  return await res.json();
}
