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

        public EmpresarioController(IEmpresarioRepositorio empresarioRepositorio)
        {
            _empresarioRepositorio = empresarioRepositorio;
        }

        [HttpGet]
		public async Task<ActionResult<List<EmpresarioModel>>> BuscarEmpresario()
		{
			List<EmpresarioModel> empresario = await _empresarioRepositorio.BuscarEmpresario();
			return Ok(empresario);
		}

		[HttpGet("{nome}")]
		public async Task<ActionResult<EmpresarioModel>> BuscarPorNome(string nome)
		{
			EmpresarioModel empresario = await _empresarioRepositorio.BuscarPorNome(nome);
			return Ok(empresario);
		}

		[HttpPost]
		public async Task<ActionResult<EmpresarioModel>> Cadastrar([FromBody] EmpresarioModel empresarioModel)
		{
			EmpresarioModel empresario = await _empresarioRepositorio.Adicionar(empresarioModel);

			return Ok(empresario);
		}

		[HttpPut]
		public async Task<ActionResult<EmpresarioModel>> Atualizar([FromBody] EmpresarioModel empresarioModel, string nome)
		{
			empresarioModel.Nome = nome;
			EmpresarioModel empresario = await _empresarioRepositorio.Atualizar(empresarioModel, nome);

			return Ok(empresario);
		}

		[HttpDelete("{nome}")]
		public async Task<ActionResult<EmpresarioModel>> Apagar(string nome)
		{
			bool apagado = await _empresarioRepositorio.Apagar(nome);
			return Ok(apagado);
		}

        public override bool Equals(object? obj)
        {
            return obj is EmpresarioController controller &&
                   EqualityComparer<IEmpresarioRepositorio>.Default.Equals(_empresarioRepositorio, controller._empresarioRepositorio);
        }
    }
}
