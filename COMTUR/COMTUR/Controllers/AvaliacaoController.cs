using COMTUR.Models;
using COMTUR.Repositorios;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class AvaliacaoController : Controller
	{
		private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;

		public AvaliacaoController(IAvaliacaoRepositorio AvaliacaoRepositorio)
		{
			_AvaliacaoRepositorio = AvaliacaoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<AvaliacaoModel>>> BuscarAvaliacao()
		{
			List<AvaliacaoModel> Avaliacao = await _AvaliacaoRepositorio.BuscarAvaliacao();
			return Ok(Avaliacao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AvaliacaoModel>> BuscarPorId(int id)
		{
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.BuscarPorId(id);
			return Ok(Avaliacao);
		}

		[HttpGet("{id}/turismo")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorIdTurismo(int id)
		{
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.BuscarIdTurismo(id);
			if (Avaliacao == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada.");
			}
			return Ok(Avaliacao);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<AvaliacaoModel>> BuscarPorIdUsuario(int id)
		{
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.BuscarIdUsuario(id);
			if (Avaliacao == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(Avaliacao);
		}

		[HttpGet("{id}/atracao")]
		public async Task<ActionResult<AvaliacaoModel>> BuscarPorIdAtracao(int id)
		{
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.BuscarIdAtracao(id);
			if (Avaliacao == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(Avaliacao);
		}

		[HttpPost]
		public async Task<ActionResult<AvaliacaoModel>> Cadastrar([FromForm] AvaliacaoModel AvaliacaoModel)
		{
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.Adicionar(AvaliacaoModel);

			return Ok(Avaliacao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AvaliacaoModel>> Atualizar([FromForm] AvaliacaoModel AvaliacaoModel, int id)
		{
			AvaliacaoModel.Id = id;
			AvaliacaoModel Avaliacao = await _AvaliacaoRepositorio.Atualizar(AvaliacaoModel, id);

			return Ok(Avaliacao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AvaliacaoModel>> Apagar(int id)
		{
			bool apagado = await _AvaliacaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}
