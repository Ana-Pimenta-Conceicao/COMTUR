using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AtracaoController : ControllerBase
	{
		private readonly IAtracaoRepositorio _atracaoRepositorio;
		private readonly IImagemAtracaoRepositorio _imagemAtracaoRepositorio;


		public AtracaoController(IAtracaoRepositorio AtracaoRepositorio, IImagemAtracaoRepositorio imagemAtracaoRepositorio)
		{
			_atracaoRepositorio = AtracaoRepositorio;
			_imagemAtracaoRepositorio = imagemAtracaoRepositorio;
		}

		[HttpPost("{atracaoId}/imagens")]
		public IActionResult AdicionarImagem(int atracaoId, [FromForm] ImagemAtracaoModel imagem)
		{
			imagem.IdAtracao = atracaoId;
			_imagemAtracaoRepositorio.Adicionar(imagem);
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<List<AtracaoModel>>> BuscarAtracao()
		{
			List<AtracaoModel> atracao = await _atracaoRepositorio.BuscarAtracao();
			return Ok(atracao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<AtracaoModel>> BuscarPorId(int id)
		{
			AtracaoModel atracao = await _atracaoRepositorio.BuscarPorId(id);
			if (atracao == null)
			{
				return NotFound($"Atração com ID {id} não encontrada.");
			}
			return Ok(atracao);
		}

		[HttpGet("{id}/imagens")]
		public async Task<ActionResult<List<string>>> BuscarImagensPorAtracaoId(int atracaoId)
		{
			var imagens = await _atracaoRepositorio.BuscarImagensPorAtracaoId(atracaoId);
			return Ok(imagens);
		}

		[HttpPost]
		public async Task<ActionResult<AtracaoModel>> Cadastrar([FromForm] AtracaoModel AtracaoModel)
		{
			AtracaoModel atracao = await _atracaoRepositorio.Adicionar(AtracaoModel);

			return Ok(atracao);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<AtracaoModel>> Atualizar([FromForm] AtracaoModel AtracaoModel, int id)
		{

			AtracaoModel atracao = await _atracaoRepositorio.Atualizar(AtracaoModel, id);

			return Ok(atracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<AtracaoModel>> Apagar(int id)
		{
			bool apagado = await _atracaoRepositorio.Apagar(id);

			return Ok(apagado);
		}
	}
}