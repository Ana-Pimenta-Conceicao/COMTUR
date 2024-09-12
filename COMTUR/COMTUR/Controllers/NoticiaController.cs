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

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<NoticiaModel>> Activity(int id)
		{
			var noticiaModel = await _noticiaRepositorio.BuscarPorId(id); // Busca a noticia que tem o id informado
			if (noticiaModel == null) // Verifica se ele existe
			{
				return NotFound("Notícia não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (noticiaModel.CanApproved()) // Se ele pode ser aprovado
			{
				noticiaModel.Approved(); // Muda seu estado para Aprovado
				await _noticiaRepositorio.Atualizar(noticiaModel, id); // Salva as alterações

				return Ok(noticiaModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return noticiaModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("Notícia já está " + noticiaModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("Notícia não pode ser Aprovada porque está " + noticiaModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<NoticiaModel>> Desactivity(int id)
		{
			var noticiaModel = await _noticiaRepositorio.BuscarPorId(id);
			if (noticiaModel == null)
			{
				return NotFound("Notícia não encontrado!");
			}

			if (noticiaModel.CanInactive())
			{
				noticiaModel.Inactive();
				await _noticiaRepositorio.Atualizar(noticiaModel, id);

				return Ok(noticiaModel);
			}
			else
			{
				return noticiaModel.GetState() == "Desativado" ?
					BadRequest("Notícia já está " + noticiaModel.GetState() + "!") :
					BadRequest("Notícia não pode ser Desativada porque está " + noticiaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<NoticiaModel>> Analyzing(int id)
		{
			var noticiaModel = await _noticiaRepositorio.BuscarPorId(id);
			if (noticiaModel == null)
			{
				return NotFound("Notícia não encontrado!");
			}

			if (noticiaModel.CanAnalyzing())
			{
				noticiaModel.Analyzing();
				await _noticiaRepositorio.Atualizar(noticiaModel, id);

				return Ok(noticiaModel);
			}
			else
			{
				return noticiaModel.GetState() == "em Análise" ?
					BadRequest("Notícia já está " + noticiaModel.GetState() + "!") :
					BadRequest("Notícia não pode ser colocado em Análise porque está " + noticiaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<NoticiaModel>> Disapproved(int id)
		{
			var noticiaModel = await _noticiaRepositorio.BuscarPorId(id);
			if (noticiaModel == null)
			{
				return NotFound("Notícia não encontrada!");
			}

			if (noticiaModel.CanDisapproved())
			{
				noticiaModel.Disapproved();
				await _noticiaRepositorio.Atualizar(noticiaModel, id);

				return Ok(noticiaModel);
			}
			else
			{
				return noticiaModel.GetState() == "Reprovado" ?
					BadRequest("Notícia já está " + noticiaModel.GetState() + "!") :
					BadRequest("Notícia não pode ser Reprovada porque está " + noticiaModel.GetState() + "!");
			}
		}

	}
}