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
        private readonly INoticiaRepository _NoticiaRepository;

        public ImagemNoticiaController(IImagemNoticiaRepositorio ImagemNoticiaRepositorio, INoticiaRepository NoticiaRepository)
        {
            _ImagemNoticiaRepositorio = ImagemNoticiaRepositorio;
            _NoticiaRepository = NoticiaRepository;
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
        public async Task<ActionResult<List<ImagemNoticiaModel>>> CadastrarImagensNoticia([FromForm] List<string> imagens, int id)
        {
            List<ImagemNoticiaModel> imagensNoticiaModel = new List<ImagemNoticiaModel>();
            foreach (string imagem in imagens)
            {
                ImagemNoticiaModel novaImagem = new ImagemNoticiaModel()
                {
                    IdNoticia = id,
                    Imagem = imagem
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
        public async Task<ActionResult<List<ImagemNoticiaModel>>> AtualizarImagensNoticia([FromForm] List<string> imagens, int id)
        {
            // Busca as imagens relacionadas à notícia no banco de dados
            List<ImagemNoticiaModel> imagensNoticia = await _NoticiaRepository.BuscarImagensPorNoticiaId(id);

            // Identifica as imagens que devem ser cadastradas (presentes em imagens, mas não em imagensNoticia)
            List<string> imagensParaCadastrar = imagens.Except(imagensNoticia.Select(i => i.Imagem)).ToList();

            // Identifica as imagens que devem ser removidas (presentes em imagensNoticia, mas não em imagens)
            List<ImagemNoticiaModel> imagensParaRemover = imagensNoticia.Where(i => !imagens.Contains(i.Imagem)).ToList();

            // Lógica para cadastrar as novas imagens
            foreach (string imagem in imagensParaCadastrar)
            {
                ImagemNoticiaModel novaImagem = new ImagemNoticiaModel()
                {
                    IdNoticia = id,
                    Imagem = imagem
                };

                await _ImagemNoticiaRepositorio.Adicionar(novaImagem);
                imagensNoticia.Add(novaImagem);
            }

            // Lógica para remover as imagens antigas
            foreach (ImagemNoticiaModel imagem in imagensParaRemover)
            {
                await _ImagemNoticiaRepositorio.Apagar(imagem.Id);
                imagensNoticia.Remove(imagem);
            } imagensNoticia.AddRange(imagensNoticia);

            return Ok(imagensNoticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Apagar(int id)
        {
            bool apagado = await _ImagemNoticiaRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}

