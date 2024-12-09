using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;
using Azure;
using COMTUR.Models.Enum;
using Response = COMTUR.Models.Utilities.Response;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class AtaController : ControllerBase
	{
		private readonly IAtaRepositorio _AtaRepositorio;
		private readonly Response _response;

		public AtaController(IAtaRepositorio AtaRepositorio)
		{
			_AtaRepositorio = AtaRepositorio;
			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<List<AtaModel>>> BuscarAta()
		{
			List<AtaModel> ata = await _AtaRepositorio.BuscarAta();
			return Ok(ata);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AtaModel>> BuscarPorId(Guid id)
		{
			AtaModel ata = await _AtaRepositorio.BuscarPorId(id);
			return Ok(ata);
		}

		[HttpPost]
		public async Task<ActionResult<AtaModel>> Cadastrar([FromBody] AtaModel ataModel)
		{
			AtaModel ata = await _AtaRepositorio.Adicionar(ataModel);

			return Ok(ata);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AtaModel>> Atualizar([FromBody] AtaModel ataModel, Guid id)
		{
			ataModel.Id = id;
			AtaModel ata = await _AtaRepositorio.Atualizar(ataModel, id);

			return Ok(ata);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AtaModel>> Apagar(Guid id)
		{
			bool apagado = await _AtaRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}