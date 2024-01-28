// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Search } from "react-feather";
import FilmesPopulares from "../../components/requisicoes/FilmesPopulares";
import FilmesLancamentos from "../../components/requisicoes/FilmesLancamentos";
import FilmesEmBreve from "../../components/requisicoes/FilmesEmBreve";
import FilmesMelhoresAvaliados from "../../components/requisicoes/FilmesEmBreve";


export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [dadosPopFilmes, setDadosPopFilmes] = useState([]);
    const [dadosLancFilmes, setDadosLancFilmes] = useState([]);
    const [dadosAvaliadosFilmes, setDadosAvaliadosFilmes] = useState([]);

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
        console.log(dadosAvaliadosFilmes);
    }, [dadosAvaliadosFilmes]);

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
                        <Search />
                    </button>
                </div>

            </div>

            {/* DEMAIS SEÇÕES */}
            <section className="container bg-white shadow p-4 mx-auto">

                {/* POPULARES */}
                <div className="populares p-4">
                    <h2 className="text-2xl font-semibold mb-4">Populares</h2>
                    <div className="flex flex-row overflow-x-scroll gap-4 py-2">
                        <FilmesPopulares popFilmes={setDadosPopFilmes} />

                        {dadosPopFilmes.slice(0, 9).map(filme => (
                            <div key={filme.id} className="flex-shrink-0 bg-slate-400 w-48 rounded-lg">
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
                </div>


                {/* LANÇAMENTOS */}
                <div className="lançamentos p-2">
                    <h2 className="text-2xl font-semibold mb-4">Lançamentos</h2>
                    <div className="flex flex-row overflow-x-scroll gap-4 py-2">
                        <FilmesLancamentos lancFilmes={setDadosLancFilmes} />
                        {dadosLancFilmes.slice(0, 9).map(filme => (
                            <div key={filme.id} className="flex-shrink-0 bg-slate-400 w-48 rounded-lg">
                                <a href={'/filme/' + filme.id} className="block">
                                    <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} 
                                         className="w-48 object-cover rounded-t-lg"
                                    />
                                    <h3 className="text-sm font-semibold text-center text-slate-800 p-2">
                                        {filme.title}
                                    </h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* MELHORES AVALIADOS */}
                <div className="emAvaliados p-2">
                <h2 className="text-2xl font-semibold mb-4">Em Avaliados</h2>
                    <div className="flex flex-row overflow-x-scroll gap-4 py-2">
                        <FilmesMelhoresAvaliados avaliadosFilmes={setDadosAvaliadosFilmes} />
                        {dadosAvaliadosFilmes.slice(0, 9).map(filme => (
                            <div key={filme.id} className="flex-shrink-0 bg-slate-400 w-48 rounded-lg">
                                <a href={'/filme/' + filme.id} className="block">
                                    <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} 
                                         className="w-48 object-cover rounded-t-lg"
                                    />
                                    <h3 className="text-sm font-semibold text-center text-slate-800 p-2">
                                        {filme.title}
                                    </h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>


            </section>
        </div>
    )
}