// components/BackdropImages.jsx
import { useEffect, useState } from "react";

export default function ImagensFundo({ setBackdrops }) {
    const [idfilmes, setIdFilmes] = useState([]);
    const [caminho, setCaminho] = useState([]);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODFlZGRlYjI1NDJiNTE1NzQ2ZTEwNWRhYTBlZjg0NCIsInN1YiI6IjY1NTYwMDFmNTM4NjZlMDExYzA3YzU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VQlPkgsMYl4kkxL2JnjZ1tR7xL_NR8Pkzn6F1pxprNw";

        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }

        let url = "https://api.themoviedb.org/3/movie/popular";
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => {
                const ids = data.results.slice(0, 10).map(filme => filme.id);
                setIdFilmes(ids);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODFlZGRlYjI1NDJiNTE1NzQ2ZTEwNWRhYTBlZjg0NCIsInN1YiI6IjY1NTYwMDFmNTM4NjZlMDExYzA3YzU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VQlPkgsMYl4kkxL2JnjZ1tR7xL_NR8Pkzn6F1pxprNw";
        
        const fetchImages = async (id) => {
            let url = `https://api.themoviedb.org/3/movie/${id}/images`;
            let response = await fetch(url, { 
                method: 'GET', 
                headers: { accept: 'application/json', Authorization: 'Bearer ' + token } 
            });
            let json = await response.json();
            return json.backdrops && json.backdrops.length >= 2 ? json.backdrops[1].file_path : null;
        };
    
        let promises = idfilmes.map(id => fetchImages(id));
    
        Promise.all(promises)
            .then(segundosFilePaths => {
                segundosFilePaths = segundosFilePaths.filter(path => path !== null);
                setCaminho(segundosFilePaths);
                setBackdrops(segundosFilePaths);
                console.log(segundosFilePaths);
            })
            .catch(err => console.error('error:' + err));
    
    }, [idfilmes]);
    
    
    return null;
    
};
