import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Search, X } from "react-feather";
import Slider from "react-slick";
import Modal from "react-modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Footer from "../../components/Footer";
import ImagensFundo from "../../components/requisicoes/ImagensFundo";


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
        <div className="main flex flex-col min-h-screen">
            <Menu />

            {/* BANNER */}
            <Banner />

            {/*SEÇÕES DOS FILMES */}
            <section className="container bg-white shadow mx-auto">
                <div className="populares p-4">
                    <h2 className="text-xl md:text-2xl font-semibold ">Populares</h2>
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


