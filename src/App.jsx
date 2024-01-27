import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home";
import NoAr from "./pages/NoAr/Noar";
import Contato from "./pages/Contato/Contato";
import Filme from './pages/Filme/Filme';
import Filmes from './pages/Filmes/Filmes';
import FilmesPopulares from './components/requisicoes/FilmesPopulares';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<FilmesPopulares />} />
          <Route path='/filmes' element={<Filmes />} />
          <Route path='/noar' element={<NoAr />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/filme/:id' element={<Filme />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
