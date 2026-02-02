const API_URL = "http://localhost:3001/produtos";

async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = "Erro inesperado";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

export async function getProdutos() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function createProduto(data: { nome: string; quantidade: number }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function updateProduto(id: number, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function deleteProduto(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}
