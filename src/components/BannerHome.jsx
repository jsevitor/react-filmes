import { useEffect, useState } from "react";
import Slider from "react-slick";
import ImagensFundo from "../components/requisicoes/ImagensFundo";

export default function Banner() {
    const [dadosBackdrops, setDadosBackdrops] = useState([]);

    useEffect(() => {
        // Aqui você pode fazer a lógica para obter as imagens de fundo
        // Por exemplo, usando a função setDadosBackdrops para atualizar o estado com os dados recebidos
    }, []);

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
            <div className="media-banner bg-gray-500 shadow p-4 min-w-full relative overflow-hidden">
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center w-1/2">
                    <input
                        type="search"
                        name="search"
                        id="searchArtist"
                        
                        className="p-3 rounded-s-lg bg-white text-black pl-6 w-full"
                        
                        placeholder="Procure por um Filme, Série ou Pessoa..."
                    />
                    <button
                        className="rounded-e-lg py-3 px-5 bg-blue-300"
                        
                    >
                        {/* <Search /> */}
                    </button>
                </div>
            </div>
        </section>
    );
}
