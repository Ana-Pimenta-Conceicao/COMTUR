using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class RamoEmpresaController : ControllerBase
	{
		private readonly IRamoEmpresaRepositorio _ramoEmpresaRepositorio;

		public RamoEmpresaController(IRamoEmpresaRepositorio RamoEmpresaRepositorio)
		{
			_ramoEmpresaRepositorio = RamoEmpresaRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<RamoEmpresaModel>>> BuscarRamoEmpresa()
		{
			List<RamoEmpresaModel> ramoEmpresa = await _ramoEmpresaRepositorio.BuscarRamoEmpresa();
			return Ok(ramoEmpresa);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<RamoEmpresaModel>> BuscarPorId(int id)
		{
			RamoEmpresaModel ramoEmpresa = await _ramoEmpresaRepositorio.BuscarPorId(id);
			return Ok(ramoEmpresa);
		}

		[HttpPost]
		public async Task<ActionResult<RamoEmpresaModel>> Cadastrar([FromBody] RamoEmpresaModel ramoEmpresaModel)
		{
			RamoEmpresaModel ramoEmpresa = await _ramoEmpresaRepositorio.Adicionar(ramoEmpresaModel);

			return Ok(ramoEmpresa);
		}

		[HttpPut]
		public async Task<ActionResult<RamoEmpresaModel>> Atualizar([FromBody] RamoEmpresaModel ramoEmpresaModel, int id)
		{
			ramoEmpresaModel.Id = id;
			RamoEmpresaModel ramoEmpresa = await _ramoEmpresaRepositorio.Atualizar(ramoEmpresaModel, id);

			return Ok(ramoEmpresa);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<RamoEmpresaModel>> Apagar(int id)
		{
			bool apagado = await _ramoEmpresaRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}