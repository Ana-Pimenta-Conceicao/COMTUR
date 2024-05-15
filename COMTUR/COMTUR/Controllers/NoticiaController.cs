using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly INoticiaRepositorio _noticiaRepositorio;
        private readonly IImagemNoticiaRepositorio _imagemNoticiaRepositorio;

        public NoticiaController(INoticiaRepositorio noticiaRepositorio, IImagemNoticiaRepositorio imagemNoticiaRepositorio)
        {
            _noticiaRepositorio = noticiaRepositorio;
            _imagemNoticiaRepositorio = imagemNoticiaRepositorio;
        }

		/*[HttpGet("porTipoStatus/{tipoStatus}")]
		public async Task<ActionResult<IEnumerable<NoticiaModel>>> GetNoticiaPorTipo(int tipoStatus)
		{
			var noticias = await _noticiaRepositorio.ListarPorTipoStatus(tipoStatus);

			if (noticias == null)
			{
				return NotFound();
			}

			return Ok(noticias);
		}*/

		[HttpPost("{noticiaId}/imagens")]
        public IActionResult AdicionarImagem(int noticiaId, [FromForm] ImagemNoticiaModel imagem)
        {
            imagem.IdNoticia = noticiaId;
            _imagemNoticiaRepositorio.Adicionar(imagem);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<NoticiaModel>>> BuscarNoticia()
        {
            List<NoticiaModel> noticias = await _noticiaRepositorio.BuscarNoticia();
            return Ok(noticias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NoticiaModel>> BuscarPorId(int id)
        {
            NoticiaModel noticia = await _noticiaRepositorio.BuscarPorId(id);
            if (noticia == null)
            {
                return NotFound($"Notícia com ID {id} não encontrada.");
            }
            return Ok(noticia);
        }

		[HttpGet("{id}/turismo")]
		public async Task<ActionResult<NoticiaModel>> BuscarPorIdTurismo(int id)
		{
			NoticiaModel noticia = await _noticiaRepositorio.GetByIdTurismo(id);
			if (noticia == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada.");
			}
			return Ok(noticia);
		}

		[HttpGet("{id}/imagens")]
        public async Task<ActionResult<List<string>>> BuscarImagensPorNoticiaId(int noticiaId)
        {
            var imagens = await _noticiaRepositorio.BuscarImagensPorNoticiaId(noticiaId);
            return Ok(imagens);
        }

        [HttpPost]
        public async Task<ActionResult<NoticiaModel>> Cadastrar([FromForm] NoticiaModel noticiaModel)
        {
            NoticiaModel noticia = await _noticiaRepositorio.Adicionar(noticiaModel);

            return Ok(noticia);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoticiaModel>> Atualizar([FromForm] NoticiaModel noticiaModel, int id)
        {

            NoticiaModel noticia = await _noticiaRepositorio.Atualizar(noticiaModel, id);

            return Ok(noticia);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<NoticiaModel>> Apagar(int id)
        {
            bool apagado = await _noticiaRepositorio.Apagar(id);

            return Ok(apagado);
        }
    }
}