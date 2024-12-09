using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;
using Azure;
using COMTUR.Models.Enum;
using Response = COMTUR.Models.Utilities.Response;


namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembroController : ControllerBase
    {
        private readonly IMembroRepositorio _MembroRepositorio;
        private readonly Response _response;

        public MembroController(IMembroRepositorio MembroRepositorio)
        {
            _MembroRepositorio = MembroRepositorio;
            _response = new Response();
        }
        [HttpGet]
        public async Task<ActionResult<List<MembroModel>>> BuscarMembro()
        {
            List<MembroModel> membro = await _MembroRepositorio.BuscarMembro();
            return Ok(membro);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MembroModel>> BuscarPorId(int id)
        {
            MembroModel Membro = await _MembroRepositorio.BuscarMembroPorId(id);
            return Ok(Membro);
        }

    

        [HttpPost]
        public async Task<ActionResult<MembroModel>> Cadastrar([FromBody] MembroModel membroModel)
        {
            MembroModel membro = await _MembroRepositorio.Adicionar(membroModel);

            return Ok(membro);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MembroModel>> Atualizar([FromBody] MembroModel membroModel, int id)
        {
            membroModel.Id = id;
            MembroModel membro = await _MembroRepositorio.Atualizar(membroModel, id);

            return Ok(membro);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MembroModel>> Apagar(int id)
        {
            bool apagado = await _MembroRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}
