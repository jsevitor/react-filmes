import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Search, X } from "react-feather";
import Slider from "react-slick";
import Modal from "react-modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import FilmesPopulares from "../../components/requisicoes/FilmesPopulares";
// import FilmesLancamentos from "../../components/requisicoes/FilmesLancamentos";
// import FilmesMelhoresAvaliados from "../../components/requisicoes/FilmesEmBreve";
import Footer from "../../components/Footer";
import ImagensFundo from "../../components/requisicoes/ImagensFundo";
import PesquisaModal from "./PesquisaModal";

import { FilmesPopulares, FilmesLancamentos, FilmesMaisAvaliados } from '../../apiRequests/FetchFilmes'

import FilmesLista from "../../components/FilmesLista";
import Banner from "../../components/BannerHome";

Modal.setAppElement("#root");

export default function Home() {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState([]);
    const [dadosBackdrops, setDadosBackdrops] = useState([]);
    const [dadosPopFilmes, setDadosPopFilmes] = useState([]);
    const [dadosLancFilmes, setDadosLancFilmes] = useState([]);
    const [dadosAvaliadosFilmes, setDadosAvaliadosFilmes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const dadosPopulares = await FilmesPopulares();
            const dadosLancamentos = await FilmesLancamentos();
            const dadosAvaliados = await FilmesMaisAvaliados();

            setDadosPopFilmes(dadosPopulares);
            setDadosLancFilmes(dadosLancamentos);
            setDadosAvaliadosFilmes(dadosAvaliados);
        }

        fetchData();
    }, []);


    const handleSearchClick = () => {
        setShowResults(false);
        fetchData(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}`);
        setSearch("");
        setTimeout(() => {
            setShowResults(true);
        }, 700);
    };
    
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
            <Banner />
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


            {/*SEÇÕES DOS FILMES */}
            <section className="container bg-white shadow p-4 mx-auto">
                <div className="populares p-4">
                    <h2 className="text-2xl font-semibold mb-4">Populares</h2>
                    <FilmesLista filmes={dadosPopFilmes.slice(0, 9)} />
                </div>
                {/* Seção de lançamentos */}
                <div className="lançamentos p-2">
                    <h2 className="text-2xl font-semibold mb-4">Lançamentos</h2>
                    <FilmesLista filmes={dadosLancFilmes.slice(0, 9)} />
                </div>
                {/* Seção de filmes mais avaliados */}
                <div className="emAvaliados p-2">
                    <h2 className="text-2xl font-semibold mb-4">Mais Votados</h2>
                    <FilmesLista filmes={dadosAvaliadosFilmes.slice(0, 9)} />
                </div>
            </section>
            <Footer />
        </div>
    )
}


