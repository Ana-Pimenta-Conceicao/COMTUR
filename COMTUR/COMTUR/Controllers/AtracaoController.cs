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
	public class AtracaoController : ControllerBase
	{
		private readonly IAtracaoRepositorio _atracaoRepositorio;
		private readonly IImagemAtracaoRepositorio _imagemAtracaoRepositorio;


		public AtracaoController(IAtracaoRepositorio AtracaoRepositorio, IImagemAtracaoRepositorio imagemAtracaoRepositorio)
		{
			_atracaoRepositorio = AtracaoRepositorio;
			_imagemAtracaoRepositorio = imagemAtracaoRepositorio;
		}

		[HttpPost("{atracaoId}/imagens")]
		public IActionResult AdicionarImagem(int atracaoId, [FromForm] ImagemAtracaoModel imagem)
		{
			imagem.IdAtracao = atracaoId;
			_imagemAtracaoRepositorio.Adicionar(imagem);
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<List<AtracaoModel>>> BuscarAtracao()
		{
			List<AtracaoModel> atracao = await _atracaoRepositorio.BuscarAtracao();
			return Ok(atracao);
		}

        [HttpGet("{idTurismo}/AtracoesRelacionadas")]
        public async Task<ActionResult<List<AtracaoModel>>> BuscarPorTurismo(int idTurismo)
        {
            List<AtracaoModel> atracao = await _atracaoRepositorio.BuscarPorTurismo(idTurismo);
            return Ok(atracao);
        }

        [HttpGet("{id}")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorId(int id)
		{
			AtracaoModel atracao = await _atracaoRepositorio.BuscarPorId(id);
			if (atracao == null)
			{
				return NotFound($"Atração com ID {id} não encontrada.");
			}
			return Ok(atracao);
		}

		[HttpGet("{id}/turismo")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorIdTurismo(int id)
		{
			AtracaoModel atracao = await _atracaoRepositorio.GetByIdTurismo(id);
			if (atracao == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada.");
			}
			return Ok(atracao);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorIdUsuario(int id)
		{
			AtracaoModel atracao = await _atracaoRepositorio.GetByIdUsuario(id);
			if (atracao == null)
			{
				return NotFound($"Usuario com ID {id} não encontrada.");
			}
			return Ok(atracao);
		}

		[HttpGet("{id}/imagens")]
		public async Task<ActionResult<List<string>>> BuscarImagensPorAtracaoId(int atracaoId)
		{
			var imagens = await _atracaoRepositorio.BuscarImagensPorAtracaoId(atracaoId);
			return Ok(imagens);
		}

		[HttpPost]
		public async Task<ActionResult<AtracaoModel>> Cadastrar([FromForm] AtracaoModel AtracaoModel)
		{
			AtracaoModel atracao = await _atracaoRepositorio.Adicionar(AtracaoModel);

			return Ok(atracao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AtracaoModel>> Atualizar([FromForm] AtracaoModel AtracaoModel, int id)
		{

			AtracaoModel atracao = await _atracaoRepositorio.Atualizar(AtracaoModel, id);

			return Ok(atracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AtracaoModel>> Apagar(int id)
		{
			bool apagado = await _atracaoRepositorio.Apagar(id);

			return Ok(apagado);
		}

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<AtracaoModel>> Activity(int id)
		{
			var AtracaoModel = await _atracaoRepositorio.BuscarPorId(id); // Busca o atracao que tem o id informado
			if (AtracaoModel == null) // Verifica se ele existe
			{
				return NotFound(" Atração não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (AtracaoModel.CanApproved()) // Se ele pode ser aprovado
			{
				AtracaoModel.Approved(); // Muda seu estado para Aprovado
				await _atracaoRepositorio.Atualizar(AtracaoModel, id); // Salva as alterações

				return Ok(AtracaoModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return AtracaoModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("O  Atração já está " + AtracaoModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("O  Atração não pode ser Aprovado porque está " + AtracaoModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<AtracaoModel>> Desactivity(int id)
		{
			var AtracaoModel = await _atracaoRepositorio.BuscarPorId(id);
			if (AtracaoModel == null)
			{
				return NotFound(" Atração não encontrado!");
			}

			if (AtracaoModel.CanInactive())
			{
				AtracaoModel.Inactive();
				await _atracaoRepositorio.Atualizar(AtracaoModel, id);

				return Ok(AtracaoModel);
			}
			else
			{
				return AtracaoModel.GetState() == "Desativado" ?
					BadRequest("O  Atração já está " + AtracaoModel.GetState() + "!") :
					BadRequest("O  Atração não pode ser Desativado porque está " + AtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<AtracaoModel>> Analyzing(int id)
		{
			var AtracaoModel = await _atracaoRepositorio.BuscarPorId(id);
			if (AtracaoModel == null)
			{
				return NotFound(" Atração não encontrado!");
			}

			if (AtracaoModel.CanAnalyzing())
			{
				AtracaoModel.Analyzing();
				await _atracaoRepositorio.Atualizar(AtracaoModel, id);

				return Ok(AtracaoModel);
			}
			else
			{
				return AtracaoModel.GetState() == "em Análise" ?
					BadRequest("O  Atração já está " + AtracaoModel.GetState() + "!") :
					BadRequest("O  Atração não pode ser colocado em Análise porque está " + AtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<AtracaoModel>> Disapproved(int id)
		{
			var AtracaoModel = await _atracaoRepositorio.BuscarPorId(id);
			if (AtracaoModel == null)
			{
				return NotFound(" Atração não encontrado!");
			}

			if (AtracaoModel.CanDisapproved())
			{
				AtracaoModel.Disapproved();
				await _atracaoRepositorio.Atualizar(AtracaoModel, id);

				return Ok(AtracaoModel);
			}
			else
			{
				return AtracaoModel.GetState() == "Reprovado" ?
					BadRequest("O  Atração já está " + AtracaoModel.GetState() + "!") :
					BadRequest("O  Atração não pode ser Reprovado porque está " + AtracaoModel.GetState() + "!");
			}
		}
	}
}