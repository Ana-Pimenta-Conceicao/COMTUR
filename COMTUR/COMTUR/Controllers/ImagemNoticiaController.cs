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


        [HttpPut("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Atualizar([FromForm] ImagemNoticiaModel ImagemNoticiaModel, int id)
        {
            ImagemNoticiaModel imagemNoticia = await _ImagemNoticiaRepositorio.Atualizar(ImagemNoticiaModel, id);

            return Ok(imagemNoticia);
        }

        [HttpPut()]
        public async Task<ActionResult<ImagemNoticiaModel>> AtualizarImagensRelacionadaNoticia([FromForm] int id, IEnumerable<string> imagensNoticia)
        {
            IEnumerable<ImagemNoticiaModel> imagemNoticia = await _NoticiaRepository.BuscarImagensPorNoticiaId(id);

            return Ok(imagemNoticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Apagar(int id)
        {
            bool apagado = await _ImagemNoticiaRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}

