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

		[HttpPost("{turismoId}/imagens")]
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
		public async Task<ActionResult<List<string>>> BuscarImagensPorTurismoId(int turismoId)
		{
			var imagens = await _TurismoRepositorio.BuscarImagensPorTurismoId(turismoId);
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

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<TurismoModel>> Activity(int id)
		{
			var turismoModel = await _TurismoRepositorio.BuscarPorId(id); // Busca o Turismo que tem o id informado
			if (turismoModel == null) // Verifica se ele existe
			{
				return NotFound("Turismo não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (turismoModel.CanApproved()) // Se ele pode ser aprovado
			{
				turismoModel.Approved(); // Muda seu estado para Aprovado
				await _TurismoRepositorio.Atualizar(turismoModel, id); // Salva as alterações

				return Ok(turismoModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return turismoModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("Turismo já está " + turismoModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("Turismo não pode ser Aprovado porque está " + turismoModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<TurismoModel>> Desactivity(int id)
		{
			var turismoModel = await _TurismoRepositorio.BuscarPorId(id);
			if (turismoModel == null)
			{
				return NotFound("Turismo não encontrado!");
			}

			if (turismoModel.CanInactive())
			{
				turismoModel.Inactive();
				await _TurismoRepositorio.Atualizar(turismoModel, id);

				return Ok(turismoModel);
			}
			else
			{
				return turismoModel.GetState() == "Desativado" ?
					BadRequest("Turismo já está " + turismoModel.GetState() + "!") :
					BadRequest("Turismo não pode ser Desativado porque está " + turismoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<TurismoModel>> Analyzing(int id)
		{
			var turismoModel = await _TurismoRepositorio.BuscarPorId(id);
			if (turismoModel == null)
			{
				return NotFound("Turismo não encontrado!");
			}

			if (turismoModel.CanAnalyzing())
			{
				turismoModel.Analyzing();
				await _TurismoRepositorio.Atualizar(turismoModel, id);

				return Ok(turismoModel);
			}
			else
			{
				return turismoModel.GetState() == "em Análise" ?
					BadRequest("Turismo já está " + turismoModel.GetState() + "!") :
					BadRequest("Turismo não pode ser colocado em Análise porque está " + turismoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<TurismoModel>> Disapproved(int id)
		{
			var turismoModel = await _TurismoRepositorio.BuscarPorId(id);
			if (turismoModel == null)
			{
				return NotFound("Turismo não encontrado!");
			}

			if (turismoModel.CanDisapproved())
			{
				turismoModel.Disapproved();
				await _TurismoRepositorio.Atualizar(turismoModel, id);

				return Ok(turismoModel);
			}
			else
			{
				return turismoModel.GetState() == "Reprovado" ?
					BadRequest("Turismo já está " + turismoModel.GetState() + "!") :
					BadRequest("Turismo não pode ser Reprovado porque está " + turismoModel.GetState() + "!");
			}
		}
	}
}