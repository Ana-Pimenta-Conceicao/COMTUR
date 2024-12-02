using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoTurismoController : Controller
    {
        private readonly IAvaliacaoTurismoRepositorio _AvaliacaoTurismoRepositorio;
        private readonly IAvaliacaoRepositorio _AvaliacaoRepositorio;

        public AvaliacaoTurismoController(IAvaliacaoTurismoRepositorio AvaliacaoTurismoRepositorio, IAvaliacaoRepositorio AvaliacaoRepositorio)
        {
            _AvaliacaoTurismoRepositorio = AvaliacaoTurismoRepositorio;
            _AvaliacaoRepositorio = AvaliacaoRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<AvaliacaoTurismoModel>>> BuscarAvaliacaoTurismoModel()
        {
            List<AvaliacaoTurismoModel> avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarAvaliacaoTurismoModel();
            return Ok(avaliacaoTurismoModel);
        }

        [HttpGet("Turismo/{idTurismo:int}")]
        public async Task<ActionResult<List<AvaliacaoTurismoModel>>> BuscarPorIdTurismo(int idTurismo)
        {
            List<AvaliacaoTurismoModel> avaliacoesTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorIdTurismo(idTurismo);
            return Ok(avaliacoesTurismoModel);
        }

        [HttpGet("Avaliacao/{idAvaliacao:int}")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> BuscarAvaliacaoTurismoPorIdAvaliacao(int idAvaliacao)
        {
            List<AvaliacaoTurismoModel> avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarAvaliacaoTurismoModel();
            return Ok(avaliacaoTurismoModel.FirstOrDefault(aa => aa.IdAvaliacao == idAvaliacao));
        }

        [HttpGet("Turismo/{idTurismo:int}/Score")]
        public async Task<ActionResult> CalcularScoreTurismo(int idTurismo)
        {
            // Buscar todas as avaliações associadas à atração
            List<AvaliacaoTurismoModel> avaliacoesTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorIdTurismo(idTurismo);

            double score = 0;

            // Iterar sobre cada avaliação e somar as notas
            foreach (var avaliacaoTurismo in avaliacoesTurismoModel)
            {
                var avaliacao = await _AvaliacaoRepositorio.BuscarPorId(avaliacaoTurismo.IdAvaliacao);

                if (avaliacao != null && !string.IsNullOrEmpty(avaliacao.Nota) && int.TryParse(avaliacao.Nota, out int nota))
                {
                    score += nota;  // Somar as notas convertidas
                }
            }

            // Calcular o score médio, evitando divisão por zero
            if (avaliacoesTurismoModel.Count > 0)
            {
                score /= avaliacoesTurismoModel.Count;
            }

            // Retornar a quantidade de avaliações e o score
            return Ok(new { avaliacoes = avaliacoesTurismoModel.Count, score = score });
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> BuscarPorId(int id)
        {
            AvaliacaoTurismoModel avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorId(id);
            return Ok(avaliacaoTurismoModel);
        }

        [HttpPost]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Cadastrar([FromForm] AvaliacaoTurismoModel avaliacaoTurismoModel)
        {
            AvaliacaoTurismoModel avaliacaoTurismo = await _AvaliacaoTurismoRepositorio.Adicionar(avaliacaoTurismoModel);

            return Ok(avaliacaoTurismo);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Apagar(int id)
        {
            bool apagado = await _AvaliacaoTurismoRepositorio.Apagar(id);
            return Ok(apagado);
        }

        [HttpPut("{id:int}/Aprovar")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Activity(int id)
        {
            var avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorId(id);
            if (avaliacaoTurismoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoTurismoModel.CanApproved())
            {
                avaliacaoTurismoModel.Approved();
                await _AvaliacaoTurismoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoTurismoModel);
            }
            else
            {
                return avaliacaoTurismoModel.GetState() == "Aprovado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoTurismoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Aprovado porque está " + avaliacaoTurismoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Desactivity(int id)
        {
            var avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorId(id);
            if (avaliacaoTurismoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoTurismoModel.CanInactive())
            {
                avaliacaoTurismoModel.Inactive();
                await _AvaliacaoTurismoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoTurismoModel);
            }
            else
            {
                return avaliacaoTurismoModel.GetState() == "Desativado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoTurismoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Desativado porque está " + avaliacaoTurismoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/EmAnalise")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Analyzing(int id)
        {
            var avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorId(id);
            if (avaliacaoTurismoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoTurismoModel.CanAnalyzing())
            {
                avaliacaoTurismoModel.Analyzing();
                await _AvaliacaoTurismoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoTurismoModel);
            }
            else
            {
                return avaliacaoTurismoModel.GetState() == "em Análise" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoTurismoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser colocado em Análise porque está " + avaliacaoTurismoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/Reprovar")]
        public async Task<ActionResult<AvaliacaoTurismoModel>> Disapproved(int id)
        {
            var avaliacaoTurismoModel = await _AvaliacaoTurismoRepositorio.BuscarPorId(id);
            if (avaliacaoTurismoModel == null)
            {
                return NotFound("Avaliação de Atração não encontrado!");
            }

            if (avaliacaoTurismoModel.CanDisapproved())
            {
                avaliacaoTurismoModel.Disapproved();
                await _AvaliacaoTurismoRepositorio.AtualizarStatus(TipoStatus.Aprovado, id);

                return Ok(avaliacaoTurismoModel);
            }
            else
            {
                return avaliacaoTurismoModel.GetState() == "Reprovado" ?
                    BadRequest("A Avaliação de Atração já está " + avaliacaoTurismoModel.GetState() + "!") :
                    BadRequest("A Avaliação de Atração não pode ser Reprovado porque está " + avaliacaoTurismoModel.GetState() + "!");
            }
        }
    }
}
