import React from "react";
import { useState} from "react";
import Estrela from "../../assets/estrela";
import Estrelasemcor from "../../assets/Estrelasemcor";
import Xadrez from "../../assets/xadrez";

function AvaliacaoCard({ avaliacaoCompleta }) {
  // Estado para controlar se o texto está expandido ou não
  const [expandido, setExpandido] = useState(false);

  // Função para alternar entre expandido e colapsado
  const toggleExpandido = () => {
      setExpandido(!expandido);
  };

  return (
      <div className="col-md-4">
          <div className="card m-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <article>
                  <div className="flex items-center mb-3">
                      <div className="w-10 h-10 me-4 rounded-full">
                          {/* Imagem ou avatar */}
                          {avaliacaoCompleta.usuario.imagemPerfilUsuario ? (
                              <img src={avaliacaoCompleta.usuario.imagemPerfilUsuario} alt="Avatar" className="rounded-full" />
                          ) : (
                              <Xadrez />
                          )}
                      </div>
                      <div className="font-medium dark:text-black">
                          <p>
                              @{avaliacaoCompleta.usuario.nome}
                              <time dateTime={avaliacaoCompleta.avaliacao.dataAvaliacao} className="block text-sm text-gray-500 dark:text-gray-400">
                                  {formatarDataParaExibicao(avaliacaoCompleta.avaliacao.dataAvaliacao)}
                              </time>
                          </p>
                      </div>
                  </div>
                  <div className="flex items-center">
                      {/* Exibir estrelas baseadas na avaliação */}
                      {[...Array(5)].map((_, i) => (
                          i < parseInt(avaliacaoCompleta.avaliacao.nota) ? <Estrela key={i} /> : <Estrelasemcor key={i} />
                      ))}
                  </div>
                  {/* Controle de exibição do comentário */}
                  <p className="mt-7 text-gray-500 dark:text-gray-400">
                      {expandido ? avaliacaoCompleta.avaliacao.comentario : `${avaliacaoCompleta.avaliacao.comentario.substring(0, 100)}...`}
                  </p>
                  {avaliacaoCompleta.avaliacao.comentario.length > 100 && (
                      <button onClick={toggleExpandido} className="text-blue-500">
                          {expandido ? 'Mostrar menos' : 'Mostrar mais'}
                      </button>
                  )}
              </article>
          </div>
      </div>
  );
}
export default AvaliacaoCard;