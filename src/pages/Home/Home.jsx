import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Search, X } from "react-feather";
import Slider from "react-slick";
import Modal from "react-modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FilmesPopulares from "../../components/requisicoes/FilmesPopulares";
import FilmesLancamentos from "../../components/requisicoes/FilmesLancamentos";
import FilmesMelhoresAvaliados from "../../components/requisicoes/FilmesEmBreve";
import Footer from "../../components/Footer";
import ImagensFundo from "../../components/requisicoes/ImagensFundo";
import PesquisaModal from "./PesquisaModal";

Modal.setAppElement("#root");

export default function Home() {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState([]);
    const [dadosBackdrops, setDadosBackdrops] = useState([]);
    const [dadosPopFilmes, setDadosPopFilmes] = useState([]);
    const [dadosLancFilmes, setDadosLancFilmes] = useState([]);
    const [dadosAvaliadosFilmes, setDadosAvaliadosFilmes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchClick = () => {
        setShowResults(false);
        fetchData(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}`);
        setSearch("");
        setTimeout(() => {
            setShowResults(true);
        }, 700);
    };

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const sliderSettings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Menu />

            {/* BANNER */}
            <div className="banner bg-gray-500 shadow p-4 min-w-full relative overflow-hidden">
                <ImagensFundo setBackdrops={setDadosBackdrops} />
                <div className="absolute inset-0 z-10">
                    <Slider {...sliderSettings} className="w-full h-full">
                        {dadosBackdrops.map((caminhoImagem, index) => (
                            <div key={index} className="w-full h-full">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${caminhoImagem}`}
                                    alt={`Imagem ${index + 1}`}
                                    className="w-full h-full object-cover opacity-60"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                {/* BARRA DE PESQUISA */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center w-1/2">
                    <input
                        type="search"
                        name="search"
                        id="searchArtist"
                        value={search}
                        className="p-3 rounded-s-lg bg-white text-black pl-6 w-full"
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setIsModalOpen(true)}
                        placeholder="Procure por um Filme, Série ou Pessoa..."
                    />
                    <button
                        className="rounded-e-lg py-3 px-5 bg-blue-300"
                        onClick={handleSearchClick}
                    >
                        <Search />
                    </button>
                </div>
            </div>

            {/* PESQUISA MODAL */}
            <PesquisaModal isOpen={isModalOpen} handleCloseModal={handleCloseModal} />



            {/* DEMAIS SEÇÕES */}
            <section className="container bg-white shadow p-4 mx-auto">

                {/* POPULARES */}
                <div className="populares p-4">
                    <h2 className="text-2xl font-semibold mb-4">Populares</h2>
                    <div className="flex flex-row overflow-x-scroll gap-4 p-4">
                        <FilmesPopulares popFilmes={setDadosPopFilmes} />

                        {dadosPopFilmes.slice(0, 9).map(filme => (
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
                </div>


                {/* LANÇAMENTOS */}
                <div className="lançamentos p-2">
                    <h2 className="text-2xl font-semibold mb-4">Lançamentos</h2>
                    <div className="flex flex-row overflow-x-scroll gap-4 p-4">
                        <FilmesLancamentos lancFilmes={setDadosLancFilmes} />
                        {dadosLancFilmes.slice(0, 9).map(filme => (
                            <div key={filme.id} className="box_filme flex-shrink-0 bg-slate-400 w-48 rounded-lg">
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


                {/* MAIS VOTADOS/AVALIADOS */}
                <div className="emAvaliados p-2">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold mb-4">Mais Votados</h2>
                        <a href={'/filmes/'}>Ver Mais</a>
                    </div>
                    <div className="flex flex-row overflow-x-scroll gap-4 p-4">
                        <FilmesMelhoresAvaliados avaliadosFilmes={setDadosAvaliadosFilmes} />
                        {dadosAvaliadosFilmes.slice(0, 9).map(filme => (
                            <div key={filme.id} className="box_filme flex-shrink-0 bg-slate-400 w-48 rounded-lg">
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
            <Footer />
        </div>
    )
}


