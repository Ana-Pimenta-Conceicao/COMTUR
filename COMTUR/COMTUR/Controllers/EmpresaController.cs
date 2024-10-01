using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmpresaController : ControllerBase
	{
		private readonly IEmpresaRepositorio _empresaRepositorio;

		public EmpresaController(IEmpresaRepositorio EmpresaRepositorio)
		{
			_empresaRepositorio = EmpresaRepositorio;
		}

		[HttpGet("{id}/tipoturismo")]
		public async Task<ActionResult<EmpresaModel>> BuscarPorIdTipoTurismo(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.GetByIdTipoTurismo(id);
			if (empresa == null)
			{
				return NotFound($"Tipo Turismo com ID {id} não encontrada.");
			}
			return Ok(empresa);
		}

		[HttpGet]
		public async Task<ActionResult<List<EmpresaModel>>> BuscarEmpresa()
		{
			List<EmpresaModel> empresas = await _empresaRepositorio.BuscarEmpresa();
			return Ok(empresas);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<EmpresaModel>> BuscarPorId(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.BuscarPorId(id);
			if (empresa == null)
			{
				return NotFound($"Empresa com ID {id} não encontrada.");
			}
			return Ok(empresa);
		}

		[HttpGet("{id}/usuario")]
		public async Task<ActionResult<List<EmpresaModel>>> BuscarPorIdUsuario(int id)
		{
			EmpresaModel empresa = await _empresaRepositorio.GetByIdUsuario(id);
			if (empresa == null)
			{
				return NotFound($"Usuario com ID {id} não encontrado.");
			}
			return Ok(empresa);
		}

		[HttpPost]
		public async Task<ActionResult<EmpresaModel>> Cadastrar([FromForm] EmpresaModel empresaModel)
		{
			EmpresaModel empresa = await _empresaRepositorio.Adicionar(empresaModel);

			return Ok(empresa);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<EmpresaModel>> Atualizar([FromForm] EmpresaModel empresaModel, int id)
		{
			;
			EmpresaModel empresa = await _empresaRepositorio.Atualizar(empresaModel, id);

			return Ok(empresa);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EmpresaModel>> Apagar(int id)
		{
			bool apagado = await _empresaRepositorio.Apagar(id);

			return Ok(apagado);
		}

		[HttpPut("{id:int}/Aprovar")]
		public async Task<ActionResult<EmpresaModel>> Activity(int id)
		{
			var EmpresaModel = await _empresaRepositorio.BuscarPorId(id); // Busca a empresa que tem o id informado
			if (EmpresaModel == null) // Verifica se ele existe
			{
				return NotFound("Empresa não encontrado!"); // Retorna que não foi encontrado (not found)
			}

			if (EmpresaModel.CanApproved()) // Se ele pode ser aprovado
			{
				EmpresaModel.Approved(); // Muda seu estado para Aprovado
				await _empresaRepositorio.Atualizar(EmpresaModel, id); // Salva as alterações

				return Ok(EmpresaModel); // Retorna que a operação foi bem-sucedida (ok)
			}
			else
			{
				return EmpresaModel.GetState() == "Aprovado" ? // Se ele já está Aprovado
					BadRequest("Empresa já está " + EmpresaModel.GetState() + "!") : // Retorna que ele já está aprovado
					BadRequest("Empresa não pode ser Aprovada porque está " + EmpresaModel.GetState() + "!"); // Retorna que não é possível aprovar por causa do seu status atual
			}
		}

		[HttpPut("{id:int}/Desativar")]
		public async Task<ActionResult<EmpresaModel>> Desactivity(int id)
		{
			var EmpresaModel = await _empresaRepositorio.BuscarPorId(id);
			if (EmpresaModel == null)
			{
				return NotFound("Empresa não encontrado!");
			}

			if (EmpresaModel.CanInactive())
			{
				EmpresaModel.Inactive();
				await _empresaRepositorio.Atualizar(EmpresaModel, id);

				return Ok(EmpresaModel);
			}
			else
			{
				return EmpresaModel.GetState() == "Desativado" ?
					BadRequest("Empresa já está " + EmpresaModel.GetState() + "!") :
					BadRequest("Empresa não pode ser Desativada porque está " + EmpresaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/EmAnalise")]
		public async Task<ActionResult<EmpresaModel>> Analyzing(int id)
		{
			var EmpresaModel = await _empresaRepositorio.BuscarPorId(id);
			if (EmpresaModel == null)
			{
				return NotFound("Empresa não encontrada!");
			}

			if (EmpresaModel.CanAnalyzing())
			{
				EmpresaModel.Analyzing();
				await _empresaRepositorio.Atualizar(EmpresaModel, id);

				return Ok(EmpresaModel);
			}
			else
			{
				return EmpresaModel.GetState() == "em Análise" ?
					BadRequest("Empresa já está " + EmpresaModel.GetState() + "!") :
					BadRequest("Empresa não pode ser colocado em Análise porque está " + EmpresaModel.GetState() + "!");
			}
		}

		[HttpPut("{id:int}/Reprovar")]
		public async Task<ActionResult<EmpresaModel>> Disapproved(int id)
		{
			var EmpresaModel = await _empresaRepositorio.BuscarPorId(id);
			if (EmpresaModel == null)
			{
				return NotFound("Empresa não encontrada!");
			}

			if (EmpresaModel.CanDisapproved())
			{
				EmpresaModel.Disapproved();
				await _empresaRepositorio.Atualizar(EmpresaModel, id);

				return Ok(EmpresaModel);
			}
			else
			{
				return EmpresaModel.GetState() == "Reprovado" ?
					BadRequest("Empresa já está " + EmpresaModel.GetState() + "!") :
					BadRequest("Empresa não pode ser Reprovada porque está " + EmpresaModel.GetState() + "!");
			}
		}
	}
}