using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AnuncioController : ControllerBase
	{
		private readonly IAnuncioRepositorio _AnuncioRepositorio;


		public AnuncioController(IAnuncioRepositorio AnuncioRepositorio)
		{
			_AnuncioRepositorio = AnuncioRepositorio;
		}

		/*[HttpGet("porTipoStatus/{tipoStatus}")]
		public async Task<ActionResult<IEnumerable<AnuncioModel>>> GetAnuncioPorTipo(int tipoStatus)
		{
			var anuncios = await _AnuncioRepositorio.ListarPorTipoStatus(tipoStatus);

			if (anuncios == null)
			{
				return NotFound();
			}

			return Ok(anuncios);
		}*/

		[HttpGet]
		public async Task<ActionResult<List<AnuncioModel>>> BuscarAnuncio()
		{
			List<AnuncioModel> Anuncio = await _AnuncioRepositorio.BuscarAnuncio();
			return Ok(Anuncio);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AnuncioModel>> BuscarPorId(int id)
		{
			AnuncioModel Anuncio = await _AnuncioRepositorio.BuscarPorId(id);
			if (Anuncio == null)
			{
				return NotFound($"Anuncio com ID {id} não encontrada.");
			}
			return Ok(Anuncio);
		}

		[HttpPost]
		public async Task<ActionResult<AnuncioModel>> Cadastrar([FromForm] AnuncioModel AnuncioModel)
		{
			AnuncioModel Anuncio = await _AnuncioRepositorio.Adicionar(AnuncioModel);

			return Ok(Anuncio);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AnuncioModel>> Atualizar([FromForm] AnuncioModel AnuncioModel, int id)
		{

			AnuncioModel Anuncio = await _AnuncioRepositorio.Atualizar(AnuncioModel, id);

			return Ok(Anuncio);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AnuncioModel>> Apagar(int id)
		{
			bool apagado = await _AnuncioRepositorio.Apagar(id);

			return Ok(apagado);
		}
	}
}