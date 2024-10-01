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
				return NotFound($"Usuario com ID {id} não encontrado.");
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

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<TipoTurismoModel>> Activity(int id)
		{
			var tipoTurismoModel = await _tipoTurismoRepositorio.BuscarPorId(id); // Busca o TipoTurismo que tem o id informado
			if (tipoTurismoModel == null) // Verifica se ele existe
			{
				return NotFound("Tipo Turismo não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (tipoTurismoModel.CanApproved()) // Se ele pode ser aprovado
			{
				tipoTurismoModel.Approved(); // Muda seu estado para Aprovado
				await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, id); // Salva as alterações

				return Ok(tipoTurismoModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return tipoTurismoModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("O Tipo Turismo já está " + tipoTurismoModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("O Tipo Turismo não pode ser Aprovado porque está " + tipoTurismoModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<TipoTurismoModel>> Desactivity(int id)
		{
			var tipoTurismoModel = await _tipoTurismoRepositorio.BuscarPorId(id);
			if (tipoTurismoModel == null)
			{
				return NotFound("Tipo Turismo não encontrado!");
			}

			if (tipoTurismoModel.CanInactive())
			{
				tipoTurismoModel.Inactive();
				await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, id);

				return Ok(tipoTurismoModel);
			}
			else
			{
				return tipoTurismoModel.GetState() == "Desativado" ?
					BadRequest("O Tipo Turismo já está " + tipoTurismoModel.GetState() + "!") :
					BadRequest("O Tipo Turismo não pode ser Desativado porque está " + tipoTurismoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<TipoTurismoModel>> Analyzing(int id)
		{
			var tipoTurismoModel = await _tipoTurismoRepositorio.BuscarPorId(id);
			if (tipoTurismoModel == null)
			{
				return NotFound("Tipo Turismo não encontrado!");
			}

			if (tipoTurismoModel.CanAnalyzing())
			{
				tipoTurismoModel.Analyzing();
				await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, id);

				return Ok(tipoTurismoModel);
			}
			else
			{
				return tipoTurismoModel.GetState() == "em Análise" ?
					BadRequest("O Tipo Turismo já está " + tipoTurismoModel.GetState() + "!") :
					BadRequest("O Tipo Turismo não pode ser colocado em Análise porque está " + tipoTurismoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<TipoTurismoModel>> Disapproved(int id)
		{
			var tipoTurismoModel = await _tipoTurismoRepositorio.BuscarPorId(id);
			if (tipoTurismoModel == null)
			{
				return NotFound("Tipo Turismo não encontrado!");
			}

			if (tipoTurismoModel.CanDisapproved())
			{
				tipoTurismoModel.Disapproved();
				await _tipoTurismoRepositorio.Atualizar(tipoTurismoModel, id);

				return Ok(tipoTurismoModel);
			}
			else
			{
				return tipoTurismoModel.GetState() == "Reprovado" ?
					BadRequest("O Tipo Turismo já está " + tipoTurismoModel.GetState() + "!") :
					BadRequest("O Tipo Turismo não pode ser Reprovado porque está " + tipoTurismoModel.GetState() + "!");
			}
		}
	}
}