using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TipoTurismoController : ControllerBase
	{
		private readonly ITipoTurismoRepositorio _tipoTurismoRepositorio;

		public TipoTurismoController(ITipoTurismoRepositorio tipoTurismoRepositorio)
		{
			_tipoTurismoRepositorio = tipoTurismoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<TipoTurismoModel>>> BuscarTodosTipoTurismo()
		{
			{
				List<TipoTurismoModel> tipos = await _tipoTurismoRepositorio.BuscarTodosTipoTurismo();
				return Ok(tipos);
			}
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<TipoTurismoModel>> BuscarPorId(int id)
		{
			{
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.BuscarPorId(id);
				return Ok(tipo);
			}
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<TurismoModel>> BuscarPorIdUsuario(int id)
		{
			TipoTurismoModel tipo = await _tipoTurismoRepositorio.GetByIdUsuario(id);
			if (tipo == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(tipo);
		}

		[HttpPost]
		public async Task<ActionResult<TipoTurismoModel>> Cadastrar([FromBody] TipoTurismoModel tipoTurismoModel)
		{
			{
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.Adicionar(tipoTurismoModel);
				return Ok(tipo);
			}
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<TipoTurismoModel>> Atualizar([FromBody] TipoTurismoModel tipoTurismoModel, int id)
		{
			{
				tipoTurismoModel.Id = id;
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, id);
				return Ok(tipo);
			}
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoTurismoModel>> Apagar(int id)
		{
			{
				bool apagado = await _tipoTurismoRepositorio.Apagar(id);
				return Ok(apagado);
			}
		}
	}
}