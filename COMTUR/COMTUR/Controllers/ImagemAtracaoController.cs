using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using System.Collections.Generic;
using COMTUR.Repositorios;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class ImagemAtracaoController : ControllerBase
	{
		private readonly IImagemAtracaoRepositorio _ImagemAtracaoRepositorio;
		private readonly AtracaoRepositorio _AtracaoRepositorio;

		public ImagemAtracaoController(IImagemAtracaoRepositorio ImagemAtracaoRepositorio, AtracaoRepositorio AtracaoRepositorio)
		{
			_ImagemAtracaoRepositorio = ImagemAtracaoRepositorio;
			_AtracaoRepositorio = AtracaoRepositorio;
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
				return NotFound($"Notícia com ID {id} não encontrada.");
			}

			return Ok(imagemAtracao);
		}

		[HttpPost]
		public async Task<ActionResult<ImagemAtracaoModel>> Cadastrar([FromForm] ImagemAtracaoModel ImagemAtracaoModel)
		{
			ImagemAtracaoModel imagemAtracao = await _ImagemAtracaoRepositorio.Adicionar(ImagemAtracaoModel);

			return Ok(imagemAtracao);
		}

		[HttpPost("{id}/CadastrarImagensAtracao")]
		public async Task<ActionResult<List<ImagemAtracaoModel>>> CadastrarImagensAtracao([FromForm] List<string> imagens, int id)
		{
			List<ImagemAtracaoModel> imagensAtracaoModel = new List<ImagemAtracaoModel>();
			foreach (string imagem in imagens)
			{
				ImagemAtracaoModel novaImagem = new ImagemAtracaoModel()
				{
					IdAtracao = id,
					Imagem = imagem
				};

				await _ImagemAtracaoRepositorio.Adicionar(novaImagem);
				imagensAtracaoModel.Add(novaImagem);
			}

			return Ok(imagensAtracaoModel);
		}


		[HttpPut("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> Atualizar([FromForm] ImagemAtracaoModel ImagemAtracaoModel, int id)
		{
			ImagemAtracaoModel imagemAtracao = await _ImagemAtracaoRepositorio.Atualizar(ImagemAtracaoModel, id);

			return Ok(imagemAtracao);
		}

		[HttpPut("{id}/AtualizarImagensAtracao")]
		public async Task<ActionResult<List<ImagemAtracaoModel>>> AtualizarImagensAtracao([FromForm] List<string> imagens, int id)
		{
			// Busca as imagens relacionadas à atração no banco de dados
			List<ImagemAtracaoModel> imagensAtracao = await _AtracaoRepositorio.BuscarImagensPorAtracaoId(id);

			// Identifica as imagens que devem ser cadastradas (presentes em imagens, mas não em imagensAtracao)
			List<string> imagensParaCadastrar = imagens.Except(imagensAtracao.Select(i => i.Imagem)).ToList();

			// Identifica as imagens que devem ser removidas (presentes em imagensAtracao, mas não em imagens)
			List<ImagemAtracaoModel> imagensParaRemover = imagensAtracao.Where(i => !imagens.Contains(i.Imagem)).ToList();

			// Lógica para cadastrar as novas imagens
			foreach (string imagem in imagensParaCadastrar)
			{
				ImagemAtracaoModel novaImagem = new ImagemAtracaoModel()
				{
					IdAtracao = id,
					Imagem = imagem
				};

				await _ImagemAtracaoRepositorio.Adicionar(novaImagem);
				imagensAtracao.Add(novaImagem);
			}

			// Lógica para remover as imagens antigas
			foreach (ImagemAtracaoModel imagem in imagensParaRemover)
			{
				await _ImagemAtracaoRepositorio.Apagar(imagem.Id);
				imagensAtracao.Remove(imagem);
			}
			imagensAtracao.AddRange(imagensAtracao);

			return Ok(imagensAtracao);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _ImagemAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}

