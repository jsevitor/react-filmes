// Footer.jsx

import React from "react";

export default function Footer() {
  return (
    <footer className="text-gray-400 p-4 text-center mt-8">
      <div className="container mx-auto text-sm">
        <p>&copy; 2024 Voliverx Dev. Todos os direitos reservados.</p>
        <p>vitorjseo@gmail.com</p>
        <p>
          Powered by{" "}
          <a href="https://developer.themoviedb.org/docs/getting-started" target="_blank" rel="noopener noreferrer" className="hover:text-spotify">
            TMDB API
          </a>
        </p>
      </div>
    </footer>
  );
};

