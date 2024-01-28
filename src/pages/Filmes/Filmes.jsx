// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import FilmesLancamentos from "../../components/requisicoes/FilmesLancamentos";
import FilmesMelhoresAvaliados from "../../components/requisicoes/FilmesEmBreve";

export default function Filmes() {
    const [ativado, setAtivado] = useState("populares");
    const [filmes, setFilmes] = useState([]);
    const [dadosLancFilmes, setDadosLancFilmes] = useState([]);
    const [dadosAvaliadosFilmes, setDadosAvaliadosFilmes] = useState([]);

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
        <div>
            <Menu />
            <section className="flex flex-row">
                <div className="shadow w-1/5 flex flex-col gap-4 px-6 pt-6 text-lg font-semibold">
                    <span
                        className={`cursor-pointer ${ativado === "populares" ? "text-blue-500" : ""}`}
                        onClick={() => setAtivado("populares")}
                    >
                        Populares
                    </span>
                    <span
                        className={`cursor-pointer ${ativado === "lancamentos" ? "text-blue-500" : ""}`}
                        onClick={() => setAtivado("lancamentos")}
                    >
                        Lançamentos
                    </span>
                    <span
                        className={`cursor-pointer ${ativado === "maisVotados" ? "text-blue-500" : ""}`}
                        onClick={() => setAtivado("maisVotados")}
                    >
                        Mais Votados
                    </span>
                </div>


                {ativado === "populares" &&
                    <div className="container shadow p-4 mx-auto">
                        <div>
                            <h1 className="text-4xl font-bold my-4 text-slate-800">Populares</h1>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            {filmes.map(filme => (
                                <div key={filme.id} className="flex-shrink-0 bg-slate-400 rounded-lg pb-4">
                                    <a href={'/filme/' + filme.id}>
                                        <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path}
                                            className="rounded-t-lg"
                                        />
                                        <h3 className="text-xl font-semibold text-center text-slate-800">
                                            {filme.title}
                                        </h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {ativado === "lancamentos" &&
                    <div className="container shadow p-4 mx-auto">
                        <div>
                            <h1 className="text-4xl font-bold my-4 text-slate-800">Lançamentos</h1>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            <FilmesLancamentos lancFilmes={setDadosLancFilmes} />
                            {dadosLancFilmes.map(filme => (
                                <div key={filme.id} className="flex-shrink-0 bg-slate-400 rounded-lg pb-4">
                                    <a href={'/filme/' + filme.id}>
                                        <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path}
                                            className="rounded-t-lg"
                                        />
                                        <h3 className="text-xl font-semibold text-center text-slate-800">
                                            {filme.title}
                                        </h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {ativado === "maisVotados" &&
                    <div className="container shadow p-4 mx-auto">
                        <div>
                            <h1 className="text-4xl font-bold my-4 text-slate-800">Mais Votados</h1>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                            <FilmesMelhoresAvaliados avaliadosFilmes={setDadosAvaliadosFilmes} />
                            {dadosAvaliadosFilmes.map(filme => (
                                <div key={filme.id} className="flex-shrink-0 bg-slate-400 rounded-lg pb-4">
                                    <a href={'/filme/' + filme.id}>
                                        <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path}
                                            className="rounded-t-lg"
                                        />
                                        <h3 className="text-xl font-semibold text-center text-slate-800">
                                            {filme.title}
                                        </h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                }


            </section>
            <Footer />
        </div>
    )
}