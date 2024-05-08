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
	public class TurismoController : ControllerBase
	{
		private readonly ITurismoRepositorio _TurismoRepositorio;
		private readonly IImagemTurismoRepositorio _imagemTurismoRepositorio;


		public TurismoController(ITurismoRepositorio TurismoRepositorio, IImagemTurismoRepositorio imagemTurismoRepositorio)
		{
			_TurismoRepositorio = TurismoRepositorio;
			_imagemTurismoRepositorio = imagemTurismoRepositorio;
		}

		/*[HttpGet("porTipoStatus/{tipoStatus}")]
		public async Task<ActionResult<IEnumerable<TurismoModel>>> GetTurismoPorTipo(int tipoStatus)
		{
			var Turismo = await _TurismoRepositorio.ListarPorTipoStatus(tipoStatus);

			if (Turismo == null)
			{
				return NotFound();
			}

			return Ok(Turismo);
		}*/

		[HttpPost("{TurismoId}/imagens")]
		public IActionResult AdicionarImagem(int TurismoId, [FromForm] ImagemTurismoModel imagem)
		{
			imagem.IdTurismo = TurismoId;
			_imagemTurismoRepositorio.Adicionar(imagem);
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<List<TurismoModel>>> BuscarTurismo()
		{
			List<TurismoModel> Turismo = await _TurismoRepositorio.BuscarTurismo();
			return Ok(Turismo);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<TurismoModel>> BuscarPorId(int id)
		{
			TurismoModel Turismo = await _TurismoRepositorio.BuscarPorId(id);
			if (Turismo == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada.");
			}
			return Ok(Turismo);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<TurismoModel>> BuscarPorIdUsuario(int id)
		{
			TurismoModel Turismo = await _TurismoRepositorio.GetByIdUsuario(id);
			if (Turismo == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(Turismo);
		}

		[HttpGet("{id}/imagens")]
		public async Task<ActionResult<List<string>>> BuscarImagensPorTurismoId(int TurismoId)
		{
			var imagens = await _TurismoRepositorio.BuscarImagensPorTurismoId(TurismoId);
			return Ok(imagens);
		}

		[HttpPost]
		public async Task<ActionResult<TurismoModel>> Cadastrar([FromForm] TurismoModel TurismoModel)
		{
			TurismoModel Turismo = await _TurismoRepositorio.Adicionar(TurismoModel);

			return Ok(Turismo);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<TurismoModel>> Atualizar([FromForm] TurismoModel TurismoModel, int id)
		{

			TurismoModel Turismo = await _TurismoRepositorio.Atualizar(TurismoModel, id);

			return Ok(Turismo);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TurismoModel>> Apagar(int id)
		{
			bool apagado = await _TurismoRepositorio.Apagar(id);

			return Ok(apagado);
		}
	}
}