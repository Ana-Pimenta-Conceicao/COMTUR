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


		public EmpresaController(IEmpresaRepositorio empresaRepositorio)
		{
			_empresaRepositorio = empresaRepositorio;
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
			empresaModel.Id = id;
			EmpresaModel empresa = await _empresaRepositorio.Atualizar(empresaModel, id);

			return Ok(empresa);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EmpresaModel>> Apagar(int id)
		{
			bool apagado = await _empresaRepositorio.Apagar(id);

			return Ok(apagado);
		}
	}
}