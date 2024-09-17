using COMTUR.Models;
using COMTUR.Repositorios;
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

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<UsuarioModel>> Activity(int id)
		{
			var usuarioModel = await _UsuarioRepositorio.BuscarPorId(id); // Busca o usuário que tem o id informado
			if (usuarioModel == null) // Verifica se ele existe
			{
				return NotFound("Usuário não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (usuarioModel.CanApproved()) // Se ele pode ser aprovado
			{
				usuarioModel.Approved(); // Muda seu estado para Aprovado
				await _UsuarioRepositorio.Atualizar(usuarioModel, id); // Salva as alterações

				return Ok(usuarioModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return usuarioModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("Usuário já está " + usuarioModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("Usuário não pode ser Aprovado porque está " + usuarioModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<UsuarioModel>> Desactivity(int id)
		{
			var usuarioModel = await _UsuarioRepositorio.BuscarPorId(id);
			if (usuarioModel == null)
			{
				return NotFound("Usuário não encontrado!");
			}

			if (usuarioModel.CanInactive())
			{
				usuarioModel.Inactive();
				await _UsuarioRepositorio.Atualizar(usuarioModel, id);

				return Ok(usuarioModel);
			}
			else
			{
				return usuarioModel.GetState() == "Desativado" ?
					BadRequest("Usuário já está " + usuarioModel.GetState() + "!") :
					BadRequest("Usuário não pode ser Desativado porque está " + usuarioModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<UsuarioModel>> Analyzing(int id)
		{
			var usuarioModel = await _UsuarioRepositorio.BuscarPorId(id);
			if (usuarioModel == null)
			{
				return NotFound("Usuário não encontrado!");
			}

			if (usuarioModel.CanAnalyzing())
			{
				usuarioModel.Analyzing();
				await _UsuarioRepositorio.Atualizar(usuarioModel, id);

				return Ok(usuarioModel);
			}
			else
			{
				return usuarioModel.GetState() == "em Análise" ?
					BadRequest("Usuário já está " + usuarioModel.GetState() + "!") :
					BadRequest("Usuário não pode ser colocado em Análise porque está " + usuarioModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<UsuarioModel>> Disapproved(int id)
		{
			var usuarioModel = await _UsuarioRepositorio.BuscarPorId(id);
			if (usuarioModel == null)
			{
				return NotFound("Usuário não encontrado!");
			}

			if (usuarioModel.CanDisapproved())
			{
				usuarioModel.Disapproved();
				await _UsuarioRepositorio.Atualizar(usuarioModel, id);

				return Ok(usuarioModel);
			}
			else
			{
				return usuarioModel.GetState() == "Reprovado" ?
					BadRequest("Usuário já está " + usuarioModel.GetState() + "!") :
					BadRequest("Usuário não pode ser Reprovado porque está " + usuarioModel.GetState() + "!");
			}
		}
	}
}
