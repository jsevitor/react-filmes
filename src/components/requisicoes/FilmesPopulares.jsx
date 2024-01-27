import { useEffect, useState } from "react";

export default function FilmesPopulares() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";

        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }

        let url = "https://api.themoviedb.org/3/movie/popular";
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setFilmes(data.results))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="bg-gray-500 w-64">
            {filmes.map(filme => (
                <div key={filme.id}>
                    <a href={'/filme/' + filme.id}
                       className="bg-gray-600 h-32" 
                    >
                        <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} />
                        <h3 className="text-base font-semibold text-center text-slate-800 p-2">
                            {filme.title}
                        </h3>
                    </a>
                </div>
            ))}
        </div>
    );
}