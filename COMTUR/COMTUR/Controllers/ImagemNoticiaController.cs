using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ImagemNoticiaController : ControllerBase
    {
        private readonly IImagemNoticiaRepositorio _ImagemNoticiaRepositorio;

        public ImagemNoticiaController(IImagemNoticiaRepositorio ImagemNoticiaRepositorio)
        {
            _ImagemNoticiaRepositorio = ImagemNoticiaRepositorio;
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

        [HttpDelete("{id}")]
        public async Task<ActionResult<ImagemNoticiaModel>> Apagar(int id)
        {
            bool apagado = await _ImagemNoticiaRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}

