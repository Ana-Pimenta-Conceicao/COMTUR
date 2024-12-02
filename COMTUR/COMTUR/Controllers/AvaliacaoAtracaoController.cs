using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoAtracaoController : Controller
    {
        private readonly IAvaliacaoAtracaoRepositorio _AvaliacaoAtracaoRepositorio;
        private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;

        public AvaliacaoAtracaoController(IAvaliacaoAtracaoRepositorio AvaliacaoAtracaoRepositorio, IAvaliacaoRepositorio AvaliacaoRepositorio)
        {
            _AvaliacaoAtracaoRepositorio = AvaliacaoAtracaoRepositorio;
            _AvaliacaoRepositorio = AvaliacaoRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<AvaliacaoAtracaoModel>>> BuscarAvaliacaoAtracaoModel()
        {
            List<AvaliacaoAtracaoModel> avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarAvaliacaoAtracaoModel();
            return Ok(avaliacaoAtracaoModel);
        }

        [HttpGet("Atracao/{idAtracao:int}")]
        public async Task<ActionResult<List<AvaliacaoAtracaoModel>>> BuscarPorIdAtracao(int idAtracao)
        {
            List<AvaliacaoAtracaoModel> avaliacoesAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorIdAtracao(idAtracao);
            return Ok(avaliacoesAtracaoModel);
        }

        [HttpGet("Avaliacao/{idAvaliacao:int}")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> BuscarAvaliacaoAtracaoPorIdAvaliacao(int idAvaliacao)
        {
            List<AvaliacaoAtracaoModel> avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarAvaliacaoAtracaoModel();
            return Ok(avaliacaoAtracaoModel.FirstOrDefault(aa => aa.IdAvaliacao == idAvaliacao));
        }

        [HttpGet("Atracao/{idAtracao:int}/Score")]
        public async Task<ActionResult> CalcularScoreAtracao(int idAtracao)
        {
            // Buscar todas as avaliações associadas à atração
            List<AvaliacaoAtracaoModel> avaliacoesAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorIdAtracao(idAtracao);

            double score = 0;

            // Iterar sobre cada avaliação e somar as notas
            foreach (var avaliacaoAtracao in avaliacoesAtracaoModel)
            {
                var avaliacao = await _AvaliacaoRepositorio.BuscarPorId(avaliacaoAtracao.IdAvaliacao);

                if (avaliacao != null && !string.IsNullOrEmpty(avaliacao.Nota) && int.TryParse(avaliacao.Nota, out int nota))
                {
                    score += nota;  // Somar as notas convertidas
                }
            }

            // Calcular o score médio, evitando divisão por zero
            if (avaliacoesAtracaoModel.Count > 0)
            {
                score /= avaliacoesAtracaoModel.Count;
            }

            // Retornar a quantidade de avaliações e o score
            return Ok(new { avaliacoes = avaliacoesAtracaoModel.Count, score = score });
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> BuscarPorId(int id)
        {
            AvaliacaoAtracaoModel avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
            return Ok(avaliacaoAtracaoModel);
        }

        [HttpPost]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> Cadastrar([FromForm] AvaliacaoAtracaoModel avaliacaoAtracaoModel)
        {
            avaliacaoAtracaoModel.Status = TipoStatus.Analisando;
            AvaliacaoAtracaoModel avaliacaoAtracao = await _AvaliacaoAtracaoRepositorio.Adicionar(avaliacaoAtracaoModel);

            return Ok(avaliacaoAtracao);
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
            var avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
            if (avaliacaoAtracaoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoAtracaoModel.CanApproved())
            {
                avaliacaoAtracaoModel.Approved();
                await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoAtracaoModel);
            }
            else
            {
                return avaliacaoAtracaoModel.GetState() == "Aprovado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoAtracaoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Aprovado porque está " + avaliacaoAtracaoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> Desactivity(int id)
        {
            var avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
            if (avaliacaoAtracaoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoAtracaoModel.CanInactive())
            {
                avaliacaoAtracaoModel.Inactive();
                await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoAtracaoModel);
            }
            else
            {
                return avaliacaoAtracaoModel.GetState() == "Desativado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoAtracaoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Desativado porque está " + avaliacaoAtracaoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/EmAnalise")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> Analyzing(int id)
        {
            var avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
            if (avaliacaoAtracaoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoAtracaoModel.CanAnalyzing())
            {
                avaliacaoAtracaoModel.Analyzing();
                await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoAtracaoModel);
            }
            else
            {
                return avaliacaoAtracaoModel.GetState() == "em Análise" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoAtracaoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser colocado em Análise porque está " + avaliacaoAtracaoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/Reprovar")]
        public async Task<ActionResult<AvaliacaoAtracaoModel>> Disapproved(int id)
        {
            var avaliacaoAtracaoModel = await _AvaliacaoAtracaoRepositorio.BuscarPorId(id);
            if (avaliacaoAtracaoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoAtracaoModel.CanDisapproved())
            {
                avaliacaoAtracaoModel.Disapproved();
                await _AvaliacaoAtracaoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoAtracaoModel);
            }
            else
            {
                return avaliacaoAtracaoModel.GetState() == "Reprovado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoAtracaoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Reprovado porque está " + avaliacaoAtracaoModel.GetState() + "!");
            }
        }
    }
}