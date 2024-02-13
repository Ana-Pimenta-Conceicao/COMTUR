import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarUsr from '../../components/navbarUsr';
import { useParams } from 'react-router-dom';

const VisualizarNoticia = () => {
    const { id } = useParams(); // UseParams para obter parâmetros da URL
    const [noticia, setNoticia] = useState(null);
    const [imagem, setImagem] = useState(null);

    const baseUrl = "https://localhost:7256/api/Noticia";

    useEffect(() => {
        const obterDetalhesNoticia = async () => {
            console.log(id);
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setNoticia(response.data);
                const imageResponse = await axios.get(`${baseUrl}/imagens/${noticia.caminhoImagem}`, { responseType: 'arraybuffer' });
                setImagem(imageResponse.data);
            } catch (error) {
                console.error('Erro ao obter detalhes da notícia:', error);
            }
        };

        obterDetalhesNoticia();
    }, [id]);

    if (!noticia) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <NavbarUsr />
            <h1>{noticia.titulo}</h1>
            {noticia.caminhoImagem && ( // Caso uma url tenha sido obtida, passamos ela para o componente img
                <img src={noticia.caminhoImagem} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
            )}
            <h2>{noticia.subtitulo}</h2>
            <p>{noticia.conteudo}</p>
            <p>Data de Publicação: {noticia.dataPublicacao}</p>
            <p>Hora de Publicação: {noticia.horaPublicacao}</p>
            {imagem && (
                <img src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(imagem)))}`} alt="" />
            )}
        </div>
    );
};

export default VisualizarNoticia;