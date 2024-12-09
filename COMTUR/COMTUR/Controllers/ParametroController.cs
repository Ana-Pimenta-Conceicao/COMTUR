using Azure;
using COMTUR.Models;
using COMTUR.Repositorios;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Response = COMTUR.Models.Utilities.Response;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ParametroController : ControllerBase
    {
        private readonly IParametroRepositorio _ParametroRepositorio;
        private readonly Response _response;

        public ParametroController(IParametroRepositorio ParametroRepositorio)
        {
            _ParametroRepositorio = ParametroRepositorio;
            _response = new Response();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ParametroModel>> BuscarPorId(int id)
        {
            ParametroModel Parametro = await _ParametroRepositorio.BuscarParametroPorId(id);
            return Ok(Parametro);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<ParametroModel>> Atualizar([FromBody] ParametroModel parametroModel, int id)
        {
            parametroModel.Id = id;
            ParametroModel parametro = await _ParametroRepositorio.Atualizar(parametroModel, id);

            return Ok(parametro);
        }
    }
}
