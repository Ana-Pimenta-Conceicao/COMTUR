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
        public async Task<ActionResult<AvaliacaoModel>> BuscarPorIdTurismo(int id)
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

        [HttpPut("{id:int}/Aprovar")]
        public async Task<ActionResult<AvaliacaoModel>> Activity(int id)
        {
            var AvaliacaoModel = await _AvaliacaoRepositorio.BuscarPorId(id); // Busca a Avaliacao que tem o id informado
            if (AvaliacaoModel == null) // Verifica se ela existe
            {
                return NotFound("Avaliacao não encontrado!"); // Retorna que não foi encontrado (not found)
            }

            if (AvaliacaoModel.CanApproved()) // Se ela pode ser aprovado
            {
                AvaliacaoModel.Approved(); // Muda seu estado para Aprovado
                await _AvaliacaoRepositorio.Atualizar(AvaliacaoModel, id); // Salva as alterações

                return Ok(AvaliacaoModel); // Retorna que a operação foi bem-sucedida (ok)
            }
            else
            {
                return AvaliacaoModel.GetState() == "Aprovado" ? // Se ela já está Aprovado
                    BadRequest("A Avaliacao já está " + AvaliacaoModel.GetState() + "!") : // Retorna que ela já está aprovado
                    BadRequest("A Avaliacao não pode ser Aprovado porque está " + AvaliacaoModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<AvaliacaoModel>> Desactivity(int id)
        {
            var AvaliacaoModel = await _AvaliacaoRepositorio.BuscarPorId(id);
            if (AvaliacaoModel == null)
            {
                return NotFound("Avaliacao não encontrado!");
            }

            if (AvaliacaoModel.CanInactive())
            {
                AvaliacaoModel.Inactive();
                await _AvaliacaoRepositorio.Atualizar(AvaliacaoModel, id);

                return Ok(AvaliacaoModel);
            }
            else
            {
                return AvaliacaoModel.GetState() == "Desativado" ?
                    BadRequest("A Avaliacao já está " + AvaliacaoModel.GetState() + "!") :
                    BadRequest("A Avaliacao não pode ser Desativado porque está " + AvaliacaoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/EmAnalise")]
        public async Task<ActionResult<AvaliacaoModel>> Analyzing(int id)
        {
            var AvaliacaoModel = await _AvaliacaoRepositorio.BuscarPorId(id);
            if (AvaliacaoModel == null)
            {
                return NotFound("Avaliacao não encontrado!");
            }

            if (AvaliacaoModel.CanAnalyzing())
            {
                AvaliacaoModel.Analyzing();
                await _AvaliacaoRepositorio.Atualizar(AvaliacaoModel, id);

                return Ok(AvaliacaoModel);
            }
            else
            {
                return AvaliacaoModel.GetState() == "em Análise" ?
                    BadRequest("A Avaliacao já está " + AvaliacaoModel.GetState() + "!") :
                    BadRequest("A Avaliacao não pode ser colocado em Análise porque está " + AvaliacaoModel.GetState() + "!");
            }
        }

        [HttpPut("{id:int}/Reprovar")]
        public async Task<ActionResult<AvaliacaoModel>> Disapproved(int id)
        {
            var AvaliacaoModel = await _AvaliacaoRepositorio.BuscarPorId(id);
            if (AvaliacaoModel == null)
            {
                return NotFound("Avaliacao não encontrado!");
            }

            if (AvaliacaoModel.CanDisapproved())
            {
                AvaliacaoModel.Disapproved();
                await _AvaliacaoRepositorio.Atualizar(AvaliacaoModel, id);

                return Ok(AvaliacaoModel);
            }
            else
            {
                return AvaliacaoModel.GetState() == "Reprovado" ?
                    BadRequest("A Avaliacao já está " + AvaliacaoModel.GetState() + "!") :
                    BadRequest("A Avaliacao não pode ser Reprovado porque está " + AvaliacaoModel.GetState() + "!");
            }
        }
    }
}
