using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TipoAtracaoController : ControllerBase
    {
        private readonly ITipoAtracaoRepositorio _TipoAtracaoRepositorio;

        public TipoAtracaoController(ITipoAtracaoRepositorio TipoAtracaoRepositorio)
        {
            _TipoAtracaoRepositorio = TipoAtracaoRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<TipoAtracaoModel>>> BuscarTipoAtracao()
        {
            List<TipoAtracaoModel> tipoAtracao = await _TipoAtracaoRepositorio.BuscarTipoAtracao();
            return Ok(tipoAtracao);
        }

        [HttpGet("{nome}")]
        public async Task<ActionResult<TipoAtracaoModel>> BuscarPorNome(string nome)
        {
            TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.BuscarPorNome(nome);
            return Ok(tipoAtracao);
        }

        [HttpPost]
        public async Task<ActionResult<TipoAtracaoModel>> Cadastrar([FromBody] TipoAtracaoModel tipoAtracaoModel)
        {
            TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Adicionar(tipoAtracaoModel);

            return Ok(tipoAtracao);
        }

        [HttpPut]
        public async Task<ActionResult<TipoAtracaoModel>> Atualizar([FromBody] TipoAtracaoModel tipoAtracaoModel, string nome)
        {
            tipoAtracaoModel.Nome = nome;
            TipoAtracaoModel tipoAtracao = await _TipoAtracaoRepositorio.Atualizar(tipoAtracaoModel, nome);

            return Ok(tipoAtracao);
        }

        [HttpDelete("{nome}")]
        public async Task<ActionResult<TipoAtracaoModel>> Apagar(string nome)
        {
            bool apagado = await _TipoAtracaoRepositorio.Apagar(nome);
            return Ok(apagado);
        }
    }
}