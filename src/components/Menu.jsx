import { Menu as MenuIcon, Search } from 'react-feather';

export default function Menu() {
    const toggleMenu = () => {
        const menu = document.querySelector('#menu-btn');
        const navbar = document.querySelector('.navbar');

        menu.classList.toggle('X');
        navbar.classList.toggle('active');
    };

    window.addEventListener('scroll', () => {
        const menu = document.querySelector('#menu-btn');
        const navbar = document.querySelector('.navbar');

        menu.classList.remove('X');
        navbar.classList.remove('active');
    });

    return (
        <header className="header">
            <div className="menu fixed bg-gray-700 py-4 h-16">
                <div className='logo'> LOGO AQUI </div>
                <nav className="navbar">
                    <a href="/">Home</a>
                    <a href="/filmes">Filmes</a>
                    <a href="/filmes">Séries</a>
                    <a href="/noar">No Ar</a>
                    <a href="/contato">Contato</a>
                </nav>

                <div id="menu-btn" onClick={toggleMenu}>
                    <MenuIcon />
                </div>

                <div id="search-icon">
                    <Search />
                </div>
            </div>
        </header>
    );
}
