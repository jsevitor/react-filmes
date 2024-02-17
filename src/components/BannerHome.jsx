import { useEffect, useState } from "react";
import Slider from "react-slick";
import ImagensFundo from "../components/requisicoes/ImagensFundo";
import SearchBar from "./SearchBar";

export default function Banner() {
    const [dadosBackdrops, setDadosBackdrops] = useState([]);

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
        <section className="banner-home">
            <div className="media-banner bg-gray-500 shadow min-w-full relative overflow-hidden">
                <ImagensFundo setBackdrops={setDadosBackdrops} />
                <div className="media">
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
                <SearchBar />
            </div>
        </section>
    );
}
