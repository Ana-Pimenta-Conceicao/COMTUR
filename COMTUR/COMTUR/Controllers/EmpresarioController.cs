using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmpresarioController : ControllerBase
	{
		private readonly IEmpresarioRepositorio _empresarioRepositorio;

		public EmpresarioController(IEmpresarioRepositorio _empresarioRepositorio)
		{
			this._empresarioRepositorio = _empresarioRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<EmpresarioModel>>> BuscarEmpresario()
		{
			List<EmpresarioModel> empresario = await _empresarioRepositorio.BuscarEmpresario();
			return Ok(empresario);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<EmpresarioModel>> BuscarPorId(int id)
		{
			EmpresarioModel empresario = await _empresarioRepositorio.BuscarPorId(id);
			return Ok(empresario);
		}

		[HttpPost]
		public async Task<ActionResult<EmpresarioModel>> Cadastrar([FromBody] EmpresarioModel empresarioModel)
		{
			EmpresarioModel empresario = await _empresarioRepositorio.Adicionar(empresarioModel);

			return Ok(empresario);
		}

		[HttpPut]
		public async Task<ActionResult<EmpresarioModel>> Atualizar([FromBody] EmpresarioModel empresarioModel, int id)
		{
			empresarioModel.Id = id;
			EmpresarioModel empresario = await _empresarioRepositorio.Atualizar(empresarioModel, id);

			return Ok(empresario);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EmpresarioModel>> Apagar(int id)
		{
			bool apagado = await _empresarioRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}
