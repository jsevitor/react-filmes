// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { data } from "autoprefixer";

export default function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODFlZGRlYjI1NDJiNTE1NzQ2ZTEwNWRhYTBlZjg0NCIsInN1YiI6IjY1NTYwMDFmNTM4NjZlMDExYzA3YzU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VQlPkgsMYl4kkxL2JnjZ1tR7xL_NR8Pkzn6F1pxprNw";

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
                const idFilme = data.results.slice(0, 10).map(filme => filme.id);
                setFilmes(idFilme);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        console.log(filmes);
    }, [filmes]);

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


                        className="p-3 rounded-s-lg w-full bg-white text-black pl-6"
                    />
                    <button
                        className="rounded-e-lg py-3 px-5 bg-blue-300"

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