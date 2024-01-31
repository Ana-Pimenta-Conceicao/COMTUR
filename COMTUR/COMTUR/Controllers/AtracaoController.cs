using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class AtracaoController : ControllerBase
	{
		private readonly IAtracaoRepositorio _AtracaoRepositorio;

		public AtracaoController(IAtracaoRepositorio AtracaoRepositorio)
		{
			_AtracaoRepositorio = AtracaoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<AtracaoModel>>> BuscarAtracao()
		{
			List<AtracaoModel> atracao = await _AtracaoRepositorio.BuscarAtracao();
			return Ok(atracao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorId(int id)
		{
			AtracaoModel atracao = await _AtracaoRepositorio.BuscarPorId(id);
			return Ok(atracao);
		}

		[HttpPost]
		public async Task<ActionResult<AtracaoModel>> Cadastrar([FromBody] AtracaoModel atracaoModel)
		{
			AtracaoModel atracao = await _AtracaoRepositorio.Adicionar(atracaoModel);

			return Ok(atracao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AtracaoModel>> Atualizar([FromBody] AtracaoModel atracaoModel, int id)
		{
			atracaoModel.Id = id;
			AtracaoModel atracao = await _AtracaoRepositorio.Atualizar(atracaoModel, id);

			return Ok(atracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AtracaoModel>> Apagar(int id)
		{
			bool apagado = await _AtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}
