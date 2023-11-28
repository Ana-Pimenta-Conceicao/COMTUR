using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace COMTUR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private readonly IAdministradorRepositorio _administradorRepositorio;

        public AdministradorController(IAdministradorRepositorio administradorRepositorio)
        {
            _administradorRepositorio = administradorRepositorio;
        }

        [HttpGet]
        public async Task<ActionResult<List<AdministradorModel>>> BuscarAdministrador()
        {
            List<AdministradorModel> administrador = await _administradorRepositorio.BuscarAdministrador();
            return Ok(administrador);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdministradorModel>> BuscarPorId(int id)
        {
            AdministradorModel administrador = await _administradorRepositorio.BuscarPorId(id);
            return Ok(administrador);
        }

        [HttpPost]
        public async Task<ActionResult<AdministradorModel>> Cadastrar([FromBody] AdministradorModel administradorModel)
        {
            AdministradorModel administrador = await _administradorRepositorio.Adicionar(administradorModel);

            return Ok(administrador);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AdministradorModel>> Atualizar([FromBody] AdministradorModel administradorModel, int id)
        {
            administradorModel.Id = id;
            AdministradorModel administrador = await _administradorRepositorio.Atualizar(administradorModel, id);

            return Ok(administrador);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AdministradorModel>> Apagar(int id)
        {
            bool apagado = await _administradorRepositorio.Apagar(id);
            return Ok(apagado);
        }
    }
}
