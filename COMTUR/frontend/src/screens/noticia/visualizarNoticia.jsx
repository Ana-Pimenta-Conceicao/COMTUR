import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VisualizarNoticia = () => {
    const { id } = useParams(); // UseParams para obter parâmetros da URL
    const [noticia, setNoticia] = useState(null);

    const baseUrl = "https://localhost:7256/api/Noticia";

    useEffect(() => {
        const obterDetalhesNoticia = async () => {
            console.log(id);
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setNoticia(response.data);
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
            <h1>{noticia.titulo}</h1>
            <h2>{noticia.subtitulo}</h2>
            <p>{noticia.conteudo}</p>
            <p>Data de Publicação: {noticia.dataPublicacao}</p>
            <p>Hora de Publicação: {noticia.horaPublicacao}</p>
        </div>
    );
};

export default VisualizarNoticia;
