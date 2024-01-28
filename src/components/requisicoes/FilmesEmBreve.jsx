import { useEffect, useState } from "react";

export default function FilmesMelhoresAvaliados({ avaliadosFilmes }) {
    
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        };

        const url = "https://api.themoviedb.org/3/movie/top_rated";
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => {
                const dataAvaliadosFilmes = data.results;
                setFilmes(dataAvaliadosFilmes);                
                avaliadosFilmes(dataAvaliadosFilmes);
            })
            .catch(error => console.error(error));
    }, [avaliadosFilmes]);

    return null;
}
