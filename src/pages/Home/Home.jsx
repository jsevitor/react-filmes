// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { data } from "autoprefixer";

export default function Home() {
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

        console.log(filmes)

    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Menu />

            {/* BANNER */}
            <div className="bg-gray-500 shadow p-4 min-w-full h-96">

                <div className="flex flex-row justify-center py-6 px-96 mb-16">
                    <input
                        type="search"
                        name="search"
                        id="searchArtist"
                        value={{}}
                        
                        className="p-3 rounded-s-lg w-full bg-white text-black pl-6"
                    />
                    <button
                        className="rounded-e-lg py-3 px-5 bg-blue-300"
                        onClick={{}}
                    >
                        buscar
                    </button>
                </div>

            </div>

            {/* DEMAIS SEÇÕES */}
            <section className="container bg-white shadow p-4 mx-auto">

                {/* POPULARES */}
                <div className="populares p-2 bg-slate-300">
                    Populares
                </div>

                {/* LANÇAMENTOS */}
                <div className="lançamentos p-2 bg-slate-300">
                    Lançamentos
                </div>

                {/* EM BREVE */}
                <div className="emBreve p-2 bg-slate-300">
                    Em breve
                </div>


            </section>
        </div>
    )
}