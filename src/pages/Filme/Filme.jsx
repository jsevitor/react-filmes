import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";

export default function Filme() {
    const [filme, setFilme] = useState({});
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const headerHeight = 80; // ajuste conforme necessário
    const params = useParams();
    let base_url = "https://image.tmdb.org/t/p/w400";

    useEffect(() => {
        let token =
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";
        let options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };
        let url = `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=credits&language=pt-BR`;

        fetch(url, options)
            .then((resp) => resp.json())
            .then((data) => setFilme(data))
            .catch((error) => console.error(error));

        // Adiciona um listener para recalcular a altura da tela quando ela for redimensionada
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // Remove o listener quando o componente é desmontado
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [params.id]);

    const reverseDate = (date) => {
        let formattedDate = date.split("-").reverse().join("/");
        return formattedDate;
    };

    const getYear = (date) => {
        let year = date.split("-")[0];
        return year;
    };

    const convertHour = (minutes) => {
        let hours = Math.floor(minutes / 60);
        let min = minutes % 60;
        return `${hours}h ${min}min`;
    };

    const translateStatus = (status) => {
        if (status == "Released") {
            return "Lançado";
        } else {
            return "Não lançado";
        }
    }

    function formatMoney(value) {
        const formatedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'USD'
        }).format(value);

        return formatedValue;
    }

    const directorAndWriter = filme.credits && filme.credits.crew
        ? filme.credits.crew.filter(person => person.job === "Director" || person.job === "Writer")
        : [];

    const getRatingColor = (rating) => {
        if (rating >= 7) {
            return 'green';
        } else if (rating >= 4) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    
    return (
        <div className="main flex flex-col min-h-screen">
            <Menu />
            <section className="movie-info bg-gray-100 shadow text-slate-800 md:mx-6 lg:mx-24"
                
            >
                <div className="movie-poster w-screen lg:w-96 py-4">
                    {filme && filme.poster_path && (
                        <img
                            src={`${base_url}${filme.poster_path}`}
                            alt={`${filme.title} Poster`}
                            className=" w-2/3 md:w-full lg:w-full mx-auto rounded-lg drop-shadow-xl object-cover"
                        />
                    )}
                </div>

                <div className="movie-detail">
                    {filme && filme.title && (
                        <div className="content p-4">
                            <h1 className="text-4xl font-bold">{filme.title}</h1>
                            <div className="flex flex-row gap-x-8 my-2 text-base text-slate-700 items-center">

                                <h3>{getYear(filme.release_date)}</h3>
                                <h3>{convertHour(filme.runtime)}</h3>
                                <h3>{filme.id}</h3>

                                <div className="rating-circle flex items-center justify-center bg-slate-400 bg-opacity-30 text-xl"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderWidth: 3,
                                        borderColor: getRatingColor(filme.vote_average),
                                        borderRadius: 100,
                                        color: getRatingColor(filme.vote_average),
                                    }}>
                                    <span className="rating-progress">
                                        {Math.floor(filme.vote_average * 10)}
                                        <span className="text-xs">%</span>
                                    </span>
                                </div>
                            </div>
                            {filme.genres && (
                                <div className="my-2">
                                    <h3>{filme.genres.map((genre) => genre.name).join(" • ")}</h3>
                                </div>
                            )}
                            {filme.tagline && <p className="my-5 italic">{filme.tagline}</p>}
                            <h3 className="mt-6 font-bold italic text-lg">Sinopse</h3>
                            <p className="mb-4">{filme.overview}</p>

                            <div>
                                {directorAndWriter.length > 0 && (
                                    <div className="flex flex-row gap-x-4">
                                        {directorAndWriter.slice(0, 4).map(person => (
                                            <div key={person.id} className="mr-4">
                                                <h3 className="mt-6 font-bold text-md">
                                                    {person.name}
                                                </h3>
                                                <p className="text-sm font-normal">
                                                    {person.job}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-9 my-6">
                                <div>
                                    <h3 className="font-bold italic text-md">Situação</h3>
                                    <p className="text-sm">{translateStatus(filme.status)} ({reverseDate(filme.release_date)})</p>
                                </div>

                                <div>
                                    <h3 className="font-bold italic text-md">Orçamento</h3>
                                    {filme.budget && <p className="text-sm font-normal not-italic">{formatMoney(filme.budget)}</p>}
                                </div>

                                <div>
                                    <h3 className="font-bold italic text-md">Arrecadação</h3>
                                    {filme.revenue && <p className="text-sm font-normal not-italic">{formatMoney(filme.revenue)}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="mx-8 px-6">
                {filme.credits && filme.credits.cast && (
                    <div className="my-4">
                        <h3 className="text-2xl font-bold mb-2">Elenco:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {filme.credits.cast.slice(0, 12).map((actor) => (
                                <div key={actor.id} className="flex flex-col items-center mb-4 mr-4">
                                    {actor.known_for_department === "Acting" && (
                                        <>
                                            {actor.profile_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                    alt={`${actor.name} Profile`}
                                                    className="rounded-full mb-2"
                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <div className="rounded-full mb-2 bg-gray-300" style={{ width: "80px", height: "80px" }}></div>
                                            )}
                                            <span className="text-center text-sm">
                                                <strong>{actor.name}</strong><br />
                                                {actor.character}
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
