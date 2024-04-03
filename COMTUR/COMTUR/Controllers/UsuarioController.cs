using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsuarioController : ControllerBase
	{
		private readonly IUsuarioRepositorio _UsuarioRepositorio;

		public UsuarioController(IUsuarioRepositorio UsuarioRepositorio)
		{
			_UsuarioRepositorio = UsuarioRepositorio;
		}

        // GET: api/Usuarios/porTipoUsuario/5
        [HttpGet("porTipoUsuario/{tipoUsuario}")]
        public async Task<ActionResult<IEnumerable<UsuarioModel>>> GetUsuariosPorTipo(int tipoUsuario)
        {
            var usuarios = await _UsuarioRepositorio.ListarPorTipoUsuario(tipoUsuario);

            if (usuarios == null)
            {
                return NotFound();
            }

            return Ok(usuarios);
        }

        [HttpGet]
		public async Task<ActionResult<List<UsuarioModel>>> BuscarUsuario()
		{
			List<UsuarioModel> Usuario = await _UsuarioRepositorio.BuscarUsuario();
			return Ok(Usuario);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<UsuarioModel>> BuscarPorId(int id)
		{
			UsuarioModel Usuario = await _UsuarioRepositorio.BuscarPorId(id);
			return Ok(Usuario);
		}

		[HttpPost]
		public async Task<ActionResult<UsuarioModel>> Cadastrar([FromForm] UsuarioModel UsuarioModel)
		{
			UsuarioModel Usuario = await _UsuarioRepositorio.Adicionar(UsuarioModel);

			return Ok(Usuario);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<UsuarioModel>> Atualizar([FromForm] UsuarioModel UsuarioModel, int id)
		{
			UsuarioModel.Id = id;
			UsuarioModel Usuario = await _UsuarioRepositorio.Atualizar(UsuarioModel, id);

			return Ok(Usuario);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<UsuarioModel>> Apagar(int id)
		{
			bool apagado = await _UsuarioRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}
