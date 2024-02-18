import { Search } from "react-feather";

export default function SearchBar() {


    
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-900 flex items-center w-11/12 md:w-2/3">
            <input
                type="search"
                name="search"
                id="searchArtist"

                className="p-1 md:p-3 rounded-s-lg bg-white text-black pl-4 w-full"

                placeholder="Procure por um Filme, Série ou Pessoa..."
            />
            <button
                className="rounded-e-lg py-1 md:py-3 px-5 bg-blue-300"

            >
                {/* <Search /> */}
                <Search />
            </button>
        </div>
    )
}