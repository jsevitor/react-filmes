import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Search, X } from "react-feather";

export default function PesquisaModal({ isOpen, handleCloseModal }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div>
      {/* Modal de Pesquisa */}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Pesquisa Modal"
        className="modal-content w-full"
        overlayClassName="modal-overlay"
      >
        <div className="flex flex-col">
          <button onClick={handleCloseModal} className="flex justify-end">
            <X className="btn_fechar mb-2" />
          </button>
          <div className="flex flex-row items-center border border-gray-500 rounded-lg">
            <span className="icn_search px-3">
              <Search />
            </span>
            <input
              type="search"
              name="search"
              id="searchArtist"
              value={search}
              className="p-3 text-black w-full outline-0 mr-3"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Procure por um Filme, Série ou Pessoa..."
            />
          </div>
          {/* <div className="flex flex-row gap-4 border-b border-b-gray-400 my-3 p-2">
            <span>
              <h2>Filmes</h2>
            </span>
            <span>
              <h2>Séries</h2>
            </span>
            <span>
              <h2>Atores</h2>
            </span>
          </div> */}

        </div>
      </Modal>
    </div>
  );
}
