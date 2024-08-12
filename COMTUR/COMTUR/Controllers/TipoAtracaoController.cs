using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;
using Azure;
using COMTUR.Models.Enum;
using COMTUR.Models.StatusState;
using Response = COMTUR.Models.StatusState.Response;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class TipoAtracaoController : ControllerBase
	{
		private readonly ITipoAtracaoRepositorio _TipoAtracaoRepositorio;
		private readonly Response _response;

		public TipoAtracaoController(ITipoAtracaoRepositorio TipoAtracaoRepositorio)
		{
			_TipoAtracaoRepositorio = TipoAtracaoRepositorio;
			_response = new Response();
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
			tipoAtracaoModel.Analyzing();
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

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<TipoAtracaoModel>> Activity(int id)
		{
			var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id); // Busca o Tipoatracao que tem o id informado
			if (tipoAtracaoModel == null) // Verifica se ele existe
			{
				return NotFound("Tipo Atração não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (tipoAtracaoModel.CanApproved()) // Se ele pode ser aprovado
			{
				tipoAtracaoModel.Approved(); // Muda seu estado para Aprovado
				await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id); // Salva as alterações

				return Ok(tipoAtracaoModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return tipoAtracaoModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("O Tipo Atração já está " + tipoAtracaoModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("O Tipo Atração não pode ser Aprovado porque está " + tipoAtracaoModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<TipoAtracaoModel>> Desactivity(int id)
		{
			var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id);
			if (tipoAtracaoModel == null)
			{
				return NotFound("Tipo Atração não encontrado!");
			}

			if (tipoAtracaoModel.CanInactive())
			{
				tipoAtracaoModel.Inactive();
				await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

				return Ok(tipoAtracaoModel);
			}
			else
			{
				return tipoAtracaoModel.GetState() == "Desativado" ?
					BadRequest("O Tipo Atração já está " + tipoAtracaoModel.GetState() + "!") : 
					BadRequest("O Tipo Atração não pode ser Desativado porque está " + tipoAtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<TipoAtracaoModel>> Analyzing(int id)
		{
			var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id);
			if (tipoAtracaoModel == null)
			{
				return NotFound("Tipo Atração não encontrado!");
			}

			if (tipoAtracaoModel.CanAnalyzing())
			{
				tipoAtracaoModel.Analyzing();
				await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

				return Ok(tipoAtracaoModel);
			}
			else
			{
				return tipoAtracaoModel.GetState() == "em Análise" ?
					BadRequest("O Tipo Atração já está " + tipoAtracaoModel.GetState() + "!") :
					BadRequest("O Tipo Atração não pode ser colocado em Análise porque está " + tipoAtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<TipoAtracaoModel>> Disapproved(int id)
		{
			var tipoAtracaoModel = await _TipoAtracaoRepositorio.BuscarPorId(id);
			if (tipoAtracaoModel == null)
			{
				return NotFound("Tipo Atração não encontrado!");
			}

			if (tipoAtracaoModel.CanDisapproved())
			{
				tipoAtracaoModel.Disapproved();
				await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, id);

				return Ok(tipoAtracaoModel);
			}
			else
			{
				return tipoAtracaoModel.GetState() == "Reprovado" ?
					BadRequest("O Tipo Atração já está " + tipoAtracaoModel.GetState() + "!") :
					BadRequest("O Tipo Atração não pode ser Reprovado porque está " + tipoAtracaoModel.GetState() + "!");
			}
		}
	}
}
