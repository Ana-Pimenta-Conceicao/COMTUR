using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class TipoAtracaoController : ControllerBase
	{
		private readonly ITipoAtracaoRepositorio _TipoAtracaoRepositorio;

		public TipoAtracaoController(ITipoAtracaoRepositorio TipoAtracaoRepositorio)
		{
			_TipoAtracaoRepositorio = TipoAtracaoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<TipoAtracaoModel>>> BuscarTipoAtracao()
		{
			List<TipoAtracaoModel> tipoAtracao = await _TipoAtracaoRepositorio.BuscarTipoAtracao();
			return Ok(tipoAtracao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> BuscarPorId(int id)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.BuscarPorId(id);
			return Ok(tipoAtracao);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorIdUsuario(int id)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.GetByIdUsuario(id);
			if (tipoAtracao == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(tipoAtracao);
		}

		[HttpPost]
		public async Task<ActionResult<TipoAtracaoModel>> Cadastrar([FromBody] TipoAtracaoModel tipoAtracaoModel)
		{
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Adicionar(tipoAtracaoModel);

			return Ok(tipoAtracao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> Atualizar([FromBody] TipoAtracaoModel tipoAtracaoModel, int id)
		{
			tipoAtracaoModel.Id = id;
			TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

			return Ok(tipoAtracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _TipoAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}