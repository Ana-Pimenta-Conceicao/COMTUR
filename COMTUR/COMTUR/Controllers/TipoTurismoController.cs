using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;

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

		[HttpGet("{nome}")]
		public async Task<ActionResult<TipoTurismoModel>> BuscarPorNome(string nome)
		{
			{
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.BuscarPorNome(nome);
				return Ok(tipo);
			}
		}

		[HttpPost]
		public async Task<ActionResult<TipoTurismoModel>> Cadastrar([FromBody] TipoTurismoModel tipoTurismoModel)
		{
			{
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.Adicionar(tipoTurismoModel);
				return Ok(tipo);
			}
		}

		[HttpPut("{nome}")]
		public async Task<ActionResult<TipoTurismoModel>> Atualizar([FromBody] TipoTurismoModel tipoTurismoModel, string nome)
		{
			{
				tipoTurismoModel.Nome = nome;
				TipoTurismoModel tipo = await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, nome);
				return Ok(tipo);
			}
		}

		[HttpDelete("{nome}")]
		public async Task<ActionResult<TipoTurismoModel>> Apagar(string nome)
		{
			{
				bool apagado = await _tipoTurismoRepositorio.Apagar(nome);
				return Ok(apagado);
			}
		}
	}
}

