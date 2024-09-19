using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Models.Relational;
using COMTUR.Repositorios;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class AvaliacaoAtracaoModelController : Controller
	{
		private readonly IAvaliacaoAtracaoRepositorio _AvaliacaoAtracaoRepositorio;
        private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;

        public AvaliacaoAtracaoModelController(IAvaliacaoAtracaoRepositorio AvaliacaoAtracaoRepositorio, IAvaliacaoRepositorio AvaliacaoRepositorio)
		{
			_AvaliacaoAtracaoRepositorio = AvaliacaoAtracaoRepositorio;
            _AvaliacaoRepositorio = AvaliacaoRepositorio;
        }

		[HttpGet]
		public async Task<ActionResult<List<AvaliacaoAtracaoModel>>> BuscarAvaliacaoAtracaoModel()
		{
			List<AvaliacaoAtracaoModel> AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarAvaliacaoAtracaoModel();
			return Ok(AvaliacaoAtracaoModel);
		}

        [HttpGet("atracao/{idAtracao:int}")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> BuscarPorIdAtracao(int idAtracao)
        {
            List<AvaliacaoAtracaoModel> AvaliacoesAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorIdAtracao(idAtracao);
            return Ok(AvaliacoesAtracaoModel);
        }

        [HttpGet("atracao/{idAtracao:int}/score")]
        public async Task<ActionResult<double>> CalcularScoreAtracao(int idAtracao)
        {
            // Buscar todas as avaliações associadas à atração
            List<AvaliacaoAtracaoModel> avaliacoesAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorIdAtracao(idAtracao);

            double score = 0;

            // Iterar sobre cada avaliação e somar as notas
            foreach (var avaliacaoAtracao in avaliacoesAtracaoModel)
            {
                var avaliacao = await _AvaliacaoRepositorio.BuscarPorId(avaliacaoAtracao.IdAvaliacao);

                if (int.TryParse(avaliacao.Nota, out int nota))
                {
                    score += nota;  // Somar as notas convertidas
                }
            }

            // Calcular o score médio
            score /= avaliacoesAtracaoModel.Count;

            return Ok(score);
        }

        [HttpGet("{id:int}")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> BuscarPorId(int id)
		{
			AvaliacaoAtracaoModel AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
			return Ok(AvaliacaoAtracaoModel);
		}

		[HttpPost]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Cadastrar([FromForm] AvaliacaoAtracaoModel AvaliacaoAtracaoModel)
		{
			AvaliacaoAtracaoModel AvaliacaoAtracao = await _AvaliacaoAtracaoRepositorio.Adicionar(AvaliacaoAtracaoModel);

			return Ok(AvaliacaoAtracao);
		}

		[HttpDelete("{id:int}")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _AvaliacaoAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Activity(int id)
		{
			var AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
			if (AvaliacaoAtracaoModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (AvaliacaoAtracaoModel.CanApproved())
			{
				AvaliacaoAtracaoModel.Approved();
				await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(AvaliacaoAtracaoModel);
			}
			else
			{
				return AvaliacaoAtracaoModel.GetState() == "Aprovado" ?
					BadRequest("A Avaliação de Atração já está " + AvaliacaoAtracaoModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Aprovado porque está " + AvaliacaoAtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Desactivity(int id)
		{
			var AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
			if (AvaliacaoAtracaoModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (AvaliacaoAtracaoModel.CanInactive())
			{
				AvaliacaoAtracaoModel.Inactive();
				await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(AvaliacaoAtracaoModel);
			}
			else
			{
				return AvaliacaoAtracaoModel.GetState() == "Desativado" ?
					BadRequest("A Avaliação de Atração já está " + AvaliacaoAtracaoModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Desativado porque está " + AvaliacaoAtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Analyzing(int id)
		{
			var AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
			if (AvaliacaoAtracaoModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (AvaliacaoAtracaoModel.CanAnalyzing())
			{
				AvaliacaoAtracaoModel.Analyzing();
				await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(AvaliacaoAtracaoModel);
			}
			else
			{
				return AvaliacaoAtracaoModel.GetState() == "em Análise" ?
					BadRequest("A Avaliação de Atração já está " + AvaliacaoAtracaoModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser colocado em Análise porque está " + AvaliacaoAtracaoModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<AvaliacaoAtracaoModel>> Disapproved(int id)
		{
			var AvaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
			if (AvaliacaoAtracaoModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (AvaliacaoAtracaoModel.CanDisapproved())
			{
				AvaliacaoAtracaoModel.Disapproved();
				await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(AvaliacaoAtracaoModel);
			}
			else
			{
				return AvaliacaoAtracaoModel.GetState() == "Reprovado" ?
					BadRequest("A Avaliação de Atração já está " + AvaliacaoAtracaoModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Reprovado porque está " + AvaliacaoAtracaoModel.GetState() + "!");
			}
		}
	}
}
