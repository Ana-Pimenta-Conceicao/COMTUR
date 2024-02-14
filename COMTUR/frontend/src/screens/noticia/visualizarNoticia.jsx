import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarUsr from '../../components/navbarUsr';
import FooterUsr from '../../components/footerUsr';
import { useParams } from 'react-router-dom';

const VisualizarNoticia = () => {
    const { id } = useParams(); // UseParams para obter parâmetros da URL
    const [noticia, setNoticia] = useState(null);
    const [outrasNoticias, setOutrasNoticias] = useState([]);
    const [imagem, setImagem] = useState(null);

    const baseUrl = "https://localhost:7256/api/Noticia";

    useEffect(() => {
        const obterDetalhesNoticia = async () => {
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                setNoticia(response.data);
                const imageResponse = await axios.get(`${baseUrl}/imagens/${response.data.caminhoImagem}`, { responseType: 'arraybuffer' });
                setImagem(imageResponse.data);
            } catch (error) {
                console.error('Erro ao obter detalhes da notícia:', error);
            }
        };

        const obterOutrasNoticias = async () => {
            try {
                const response = await axios.get(`${baseUrl}`);
                const outrasNoticiasOrdenadas = response.data.sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));
                const outrasNoticiasRecentes = outrasNoticiasOrdenadas.slice(0, 3);
                setOutrasNoticias(outrasNoticiasRecentes);
            } catch (error) {
                console.error('Erro ao obter outras notícias:', error);
            }
        };
        obterDetalhesNoticia();
        obterOutrasNoticias();
    }, [id]);

    function formatarDataParaExibicao(data) {
        const partes = data.split('-');
        if (partes.length === 3) {
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        }
        return data; // Retorna a data original se não estiver no formato esperado
    }

    if (!noticia) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <NavbarUsr />
            <div className='flex flex-col pl-24 pr-24'>
                <h1 className='text-[#373636] text-4xl font-extrabold pt-14'>{noticia.titulo}</h1>
                <h2 className='text-[#373636] text-xl font-semibold pt-3'>{noticia.subtitulo}</h2>
                <p className='text-[#373636] text-l font-normal pt-1'>{formatarDataParaExibicao(noticia.dataPublicacao)} às {noticia.horaPublicacao}</p>
            </div>
            <div className='flex flex-col pl-24 pr-24 items-center'>
                {noticia.caminhoImagem && (
                    <img className="flex pt-4 w-2/3" src={noticia.caminhoImagem} alt="Preview" />
                )}
                <h3 className='text-base font-medium italic'>{noticia.legendaImagem}</h3>
            </div>

            <div className='pl-36 pr-36 pb-10 text-[#373636] text-l font-base pt-4'>
                {noticia.conteudo.split('\n').map((paragrafo, index) => (
                    <React.Fragment key={index}>
                        <p className="pt-1 text-justify">{paragrafo}</p>
                    </React.Fragment>
                ))}
            </div>

            {imagem && (
                <img src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(imagem)))}`} alt="" />
            )}

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-1 my-8 opacity-100 bg-[#FFD121] border-0 rounded" />
                <div className="absolute justify-center items-center px-4 -translate-x-1/2 bg-white left-1/2">
                    <h1 className='text-[#373636] text-2xl font-bold pl-6'>MAIS</h1>
                    <h1 className='text-[#373636] text-2xl font-bold'>NOTÍCIAS</h1>
                </div>
            </div>

            {/* Cards de outras notícias */}
            <div className="pt-5 pb-5 pl-64 pr-64">
                {outrasNoticias.map((noticia) => (
                    <div key={noticia.id} className="p-4">
                        <div className='grid grid-cols-2 border-2 border-[#DBDBDB]'>
                            {noticia.caminhoImagem && (
                                <img src={noticia.caminhoImagem} alt="Preview" className="flex w-full h-64 border-r-2" />
                            )}
                            <div className='pl-6 pt-3'>
                                <h2 className='pr-6 text-[#373636] font-semibold text-base uppercase'>{noticia.titulo}</h2>
                                <h2 className='pr-6 pt-1 text-[#373636] font-normal text-sm'>{noticia.subtitulo}</h2>
                                <div className='flex'>
                                    <button className='mt-6 bg-[#FFD121] text-[#373636] font-medium hover:bg-black hover:text-white w-32 h-10'>Leia Mais</button>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bottom-0 right-0'>
                                <div className='flex justify-center items-center text-[#373636] font-medium bg-[#FFD121] w-32 h-8'>{formatarDataParaExibicao(noticia.dataPublicacao)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FooterUsr />
        </div>
    );
};
//flex flex-row bg-red-400 justify-end items-end text-right pb-0
export default VisualizarNoticia;
