import { useEffect, useState } from "react";

export default function FilmesPopulares({ popFilmes }) {

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
            .then(data => {
                const dataPopFilmes = data.results;
                setFilmes(dataPopFilmes);
                popFilmes(dataPopFilmes)
            })
            .catch(error => console.error(error));
    }, [popFilmes]);

   return null;
}