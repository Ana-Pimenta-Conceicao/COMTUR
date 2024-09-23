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
	public class AvaliacaoEmpresaController : Controller
	{
		private readonly IAvaliacaoEmpresaRepositorio _AvaliacaoEmpresaRepositorio;
        private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;

        public AvaliacaoEmpresaController(IAvaliacaoEmpresaRepositorio AvaliacaoEmpresaRepositorio, IAvaliacaoRepositorio AvaliacaoRepositorio)
		{
			_AvaliacaoEmpresaRepositorio = AvaliacaoEmpresaRepositorio;
            _AvaliacaoRepositorio = AvaliacaoRepositorio;
        }

		[HttpGet]
		public async Task<ActionResult<List<AvaliacaoEmpresaModel>>> BuscarAvaliacaoEmpresaModel()
		{
			List<AvaliacaoEmpresaModel> avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarAvaliacaoEmpresaModel();
			return Ok(avaliacaoEmpresaModel);
		}

        [HttpGet("Empresa/{idEmpresa:int}")]
        public async Task<ActionResult<List<AvaliacaoEmpresaModel>>> BuscarPorIdEmpresa(int idEmpresa)
        {
            List<AvaliacaoEmpresaModel> avaliacoesEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorIdEmpresa(idEmpresa);
            return Ok(avaliacoesEmpresaModel);
        }

        [HttpGet("Empresa/{idEmpresa:int}/Score")]
        public async Task<ActionResult> CalcularScoreEmpresa(int idEmpresa)
        {
            // Buscar todas as avaliações associadas à atração
            List<AvaliacaoEmpresaModel> avaliacoesEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorIdEmpresa(idEmpresa);

            double score = 0;

            // Iterar sobre cada avaliação e somar as notas
            foreach (var avaliacaoEmpresa in avaliacoesEmpresaModel)
            {
                var avaliacao = await _AvaliacaoRepositorio.BuscarPorId(avaliacaoEmpresa.IdAvaliacao);

                if (int.TryParse(avaliacao.Nota, out int nota))
                {
                    score += nota;  // Somar as notas convertidas
                }
            }

            // Calcular o score médio, evitando divisão por zero
            if (avaliacoesEmpresaModel.Count > 0)
            {
                score /= avaliacoesEmpresaModel.Count;
            }

            // Retornar a quantidade de avaliações e o score
            return Ok(new { avaliacoes = avaliacoesEmpresaModel.Count, score = score });
        }

        [HttpGet("{id:int}")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> BuscarPorId(int id)
		{
			AvaliacaoEmpresaModel avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorId(id);
			return Ok(avaliacaoEmpresaModel);
		}

        [HttpPost]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Cadastrar([FromForm] AvaliacaoEmpresaModel avaliacaoEmpresaModel)
		{
			AvaliacaoEmpresaModel avaliacaoEmpresa = await _AvaliacaoEmpresaRepositorio.Adicionar(avaliacaoEmpresaModel);

			return Ok(avaliacaoEmpresa);
		}

		[HttpDelete("{id:int}")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Apagar(int id)
		{
			bool apagado = await _AvaliacaoEmpresaRepositorio.Apagar(id);
			return Ok(apagado);
		}

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Activity(int id)
		{
			var avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorId(id);
			if (avaliacaoEmpresaModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (avaliacaoEmpresaModel.CanApproved())
			{
				avaliacaoEmpresaModel.Approved();
				await _AvaliacaoEmpresaRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(avaliacaoEmpresaModel);
			}
			else
			{
				return avaliacaoEmpresaModel.GetState() == "Aprovado" ?
					BadRequest("A Avaliação de Atração já está " + avaliacaoEmpresaModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Aprovado porque está " + avaliacaoEmpresaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Desactivity(int id)
		{
			var avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorId(id);
			if (avaliacaoEmpresaModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (avaliacaoEmpresaModel.CanInactive())
			{
				avaliacaoEmpresaModel.Inactive();
				await _AvaliacaoEmpresaRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(avaliacaoEmpresaModel);
			}
			else
			{
				return avaliacaoEmpresaModel.GetState() == "Desativado" ?
					BadRequest("A Avaliação de Atração já está " + avaliacaoEmpresaModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Desativado porque está " + avaliacaoEmpresaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Analyzing(int id)
		{
			var avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorId(id);
			if (avaliacaoEmpresaModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (avaliacaoEmpresaModel.CanAnalyzing())
			{
				avaliacaoEmpresaModel.Analyzing();
				await _AvaliacaoEmpresaRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(avaliacaoEmpresaModel);
			}
			else
			{
				return avaliacaoEmpresaModel.GetState() == "em Análise" ?
					BadRequest("A Avaliação de Atração já está " + avaliacaoEmpresaModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser colocado em Análise porque está " + avaliacaoEmpresaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<AvaliacaoEmpresaModel>> Disapproved(int id)
		{
			var avaliacaoEmpresaModel = await _AvaliacaoEmpresaRepositorio.BuscarPorId(id);
			if (avaliacaoEmpresaModel == null)
			{
				return NotFound("Avaliação de Atração não encontrado!");
			}

			if (avaliacaoEmpresaModel.CanDisapproved())
			{
				avaliacaoEmpresaModel.Disapproved();
				await _AvaliacaoEmpresaRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

				return Ok(avaliacaoEmpresaModel);
			}
			else
			{
				return avaliacaoEmpresaModel.GetState() == "Reprovado" ?
					BadRequest("A Avaliação de Atração já está " + avaliacaoEmpresaModel.GetState() + "!") :
					BadRequest("A Avaliação de Atração não pode ser Reprovado porque está " + avaliacaoEmpresaModel.GetState() + "!");
			}
		}
	}
}
