import React, { useState } from "react";


interface Film {
  id: number;
  title: string;
  release_date: string;
}

const FilmSearch: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [filmes, setFilmes] = useState<Film[]>([]); 
  const [loading, setLoading] = useState(false);


  const handleSearch = async () => {
    if (!titulo) return; 
    setLoading(true); 
   

    const result = [
      { id: 1, title: "Star Wars", release_date: "1977" },
      { id: 2, title: "The Matrix", release_date: "1999" },
      { id: 3, title: "Inception", release_date: "2010" },
    ]; 

    setFilmes(result); 
    setLoading(false); 
  };

  return (
    <div>
      <h1>Buscar Filmes</h1>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Digite o nome do filme"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>

      {loading && <p>Carregando...</p>} 

      
      <ul>
        {filmes.map((filme) => (
          <li key={filme.id}>
            {filme.title} ({filme.release_date})
          </li>
        ))}
      </ul>

   
      {filmes.length === 0 && !loading && <p>Nenhum filme encontrado.</p>}
    </div>
  );
};

export default FilmSearch;