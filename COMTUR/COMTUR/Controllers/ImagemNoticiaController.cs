using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using System.Collections.Generic;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ImagemNoticiaController : ControllerBase
    {
        private readonly IImagemNoticiaRepositorio _ImagemNoticiaRepositorio;
        private readonly INoticiaRepositorio _NoticiaRepositorio;

        public ImagemNoticiaController(IImagemNoticiaRepositorio ImagemNoticiaRepositorio, INoticiaRepositorio NoticiaRepositorio)
        {
            _ImagemNoticiaRepositorio = ImagemNoticiaRepositorio;
            _NoticiaRepositorio = NoticiaRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<ImagemNoticiaModel>>> BuscarImagemNoticia()
        {
            List<ImagemNoticiaModel> imagemNoticia = await _ImagemNoticiaRepositorio.BuscarImagemNoticia();
            return Ok(imagemNoticia);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> BuscarPorId(int id)
        {
            ImagemNoticiaModel imagemNoticia = await _ImagemNoticiaRepositorio.BuscarPorId(id);
            if (imagemNoticia == null)
            {
                return NotFound($"Notícia com ID {id} não encontrada.");
            }

            return Ok(imagemNoticia);
        }

        [HttpPost]
        public async Task<ActionResult<ImagemNoticiaModel>> Cadastrar([FromForm] ImagemNoticiaModel ImagemNoticiaModel)
        {
            ImagemNoticiaModel imagemNoticia = await _ImagemNoticiaRepositorio.Adicionar(ImagemNoticiaModel);

            return Ok(imagemNoticia);
        }

        [HttpPost("{id}/CadastrarImagensNoticia")]
        public async Task<ActionResult<List<ImagemNoticiaModel>>> CadastrarImagensNoticia([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id, [FromForm] int idUsuario)
        {
            NoticiaModel noticia = await _NoticiaRepositorio.BuscarPorId(id);
            if (noticia == null)
            {
                return NotFound($"Notícia com ID {id} não encontrada!");
            }

            List<ImagemNoticiaModel> imagensNoticiaModel = new List<ImagemNoticiaModel>();
            for (int i = 0; i < imagens.Count; i++)
            {
                ImagemNoticiaModel novaImagem = new ImagemNoticiaModel()
                {
                    IdNoticia = id,
					Imagem = imagens[i],
					LegendaImagem = legendas[i],
					IdUsuario = idUsuario
				};

                await _ImagemNoticiaRepositorio.Adicionar(novaImagem);
                imagensNoticiaModel.Add(novaImagem);
            }


            return Ok(imagensNoticiaModel);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Atualizar([FromForm] ImagemNoticiaModel ImagemNoticiaModel, int id)
        {
            ImagemNoticiaModel imagemNoticia = await _ImagemNoticiaRepositorio.Atualizar(ImagemNoticiaModel, id);

            return Ok(imagemNoticia);
        }

        [HttpPut("{id}/AtualizarImagensNoticia")]
        public async Task<ActionResult<List<ImagemNoticiaModel>>> AtualizarImagensNoticia([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id)
        {
            NoticiaModel noticia = await _NoticiaRepositorio.BuscarPorId(id);
            if (noticia == null)
            {
                return NotFound($"Notícia com ID {id} não encontrada!");
            }

            // Busca as imagens relacionadas à notícia no banco de dados
            List<ImagemNoticiaModel> imagensNoticia = await _NoticiaRepositorio.BuscarImagensPorNoticiaId(id);

            List<ImagemNoticiaModel> imagensAtualizadas = new List<ImagemNoticiaModel>();

            // Atualiza ou cadastra novas imagens
            for (int i = 0; i < imagens.Count; i++)
            {
                string imagem = imagens[i];
                string legenda = legendas[i];

                // Verifica se a imagem já existe na lista de imagens relacionadas à notícia
                ImagemNoticiaModel imagemExistente = imagensNoticia.FirstOrDefault(img => img.Imagem == imagem);

                if (imagemExistente != null)
                {
                    // Se a imagem existe, atualiza a legenda se necessário
                    if (imagemExistente.LegendaImagem != legenda)
                    {
                        imagemExistente.LegendaImagem = legenda;
                        // Atualiza a imagem no banco de dados (se necessário)
                        await _ImagemNoticiaRepositorio.Atualizar(imagemExistente, imagemExistente.Id);
                    }
                }
                else
                {
                    // Se a imagem não existe, cadastra uma nova imagem
                    ImagemNoticiaModel novaImagem = new ImagemNoticiaModel { IdNoticia = id, Imagem = imagem, LegendaImagem = legenda };
                    // Insere a nova imagem no banco de dados
                    await _ImagemNoticiaRepositorio.Adicionar(novaImagem);
                    imagensNoticia.Add(novaImagem); // Adiciona a nova imagem à lista de imagens relacionadas à notícia
                }

                // Adiciona a imagem atualizada ou nova à lista de imagens atualizadas
                imagensAtualizadas.Add(new ImagemNoticiaModel { Imagem = imagem, LegendaImagem = legenda });
            }

            // Remove as imagens que foram excluídas
            foreach (var imagem in imagensNoticia)
            {
                if (!imagens.Contains(imagem.Imagem))
                {
                    // Remove a imagem do banco de dados
                    await _ImagemNoticiaRepositorio.Apagar(imagem.Id);
                }
            }

            // Retorna a lista de imagens atualizadas
            return Ok(imagensAtualizadas);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Apagar(int id)
        {
            bool apagado = await _ImagemNoticiaRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}

