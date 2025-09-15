export const API_KEY = "0679e0fc05645b8987448a8fe2e6d149";
export const BASE_URL = 'https://api.themoviedb.org/3';

export async function buscarDetalhes(id: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    );
    if (!response.ok) {
      throw new Error('Falha na resposta da API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
}

// Busca filmes por título
export async function buscarFilmes(titulo: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=pt-BR`
    );
    if (!response.ok) {
      throw new Error('Falha na resposta da API');
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
}