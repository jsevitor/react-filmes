import React from "react";

export default function FilmesLista({ filmes }) {
  return (
    <div className="flex flex-row overflow-x-scroll gap-4 p-4 ">
      {filmes.map(filme => (
        <div key={filme.id} className="box_filme flex-shrink-0 bg-slate-400 w-48 rounded-lg">
          <a href={`/filme/${filme.id}`} className="block">
            <img
              src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
              className="w-48 object-cover rounded-t-lg"
              alt={filme.title}
            />
            <h3 className="text-sm font-semibold text-center text-slate-800 p-2">
              {filme.title}
            </h3>
          </a>
        </div>
      ))}
    </div>
  );
}

