using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class ImagemAtracaoController : ControllerBase
	{
		private readonly IImagemAtracaoRepositorio _ImagemAtracaoRepositorio;

		public ImagemAtracaoController(IImagemAtracaoRepositorio ImagemAtracaoRepositorio)
		{
			_ImagemAtracaoRepositorio = ImagemAtracaoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<ImagemAtracaoModel>>> BuscarImagemAtracao()
		{
			List<ImagemAtracaoModel> imagemAtracao = await _ImagemAtracaoRepositorio.BuscarImagemAtracao();
			return Ok(imagemAtracao);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> BuscarPorId(int id)
		{
			ImagemAtracaoModel imagemAtracao = await _ImagemAtracaoRepositorio.BuscarPorId(id);
			if (imagemAtracao == null)
			{
				return NotFound($"Imagem atracao com ID {id} não encontrada.");
			}

			return Ok(imagemAtracao);
		}

		[HttpPost]
		public async Task<ActionResult<ImagemAtracaoModel>> Cadastrar([FromForm] ImagemAtracaoModel ImagemAtracaoModel)
		{
			ImagemAtracaoModel imagemAtracao = await _ImagemAtracaoRepositorio.Adicionar(ImagemAtracaoModel);

			return Ok(imagemAtracao);
		}


		[HttpPut("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> Atualizar([FromForm] ImagemAtracaoModel ImagemAtracaoModel, int id)
		{
			ImagemAtracaoModel imagemAtracao = await _ImagemAtracaoRepositorio.Atualizar(ImagemAtracaoModel, id);

			return Ok(imagemAtracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _ImagemAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}

