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
		private readonly IAtracaoRepositorio _AtracaoRepositorio;

		public ImagemAtracaoController(IImagemAtracaoRepositorio ImagemAtracaoRepositorio, IAtracaoRepositorio AtracaoRepositorio)
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
				return NotFound($"Atração com ID {id} não encontrada.");
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
		public async Task<ActionResult<List<ImagemAtracaoModel>>> CadastrarImagensAtracao([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id, [FromForm] int idUsuario)
		{
			AtracaoModel Atracao = await _AtracaoRepositorio.BuscarPorId(id);
			if (Atracao == null)
			{
				return NotFound($"Atração com ID {id} não encontrada!");
			}

			List<ImagemAtracaoModel> imagensAtracaoModel = new List<ImagemAtracaoModel>();
			for (int i = 0; i < imagens.Count; i++)
			{
				ImagemAtracaoModel novaImagem = new ImagemAtracaoModel()
				{
					IdAtracao = id,
					Imagem = imagens[i],
					LegendaImagem = legendas[i],
					IdUsuario = idUsuario
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
		public async Task<ActionResult<List<ImagemAtracaoModel>>> AtualizarImagensAtracao([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id)
		{
			AtracaoModel Atracao = await _AtracaoRepositorio.BuscarPorId(id);
			if (Atracao == null)
			{
				return NotFound($"Atração com ID {id} não encontrada!");
			}

			// Busca as imagens relacionadas à atração no banco de dados
			List<ImagemAtracaoModel> imagensAtracao = await _AtracaoRepositorio.BuscarImagensPorAtracaoId(id);

			List<ImagemAtracaoModel> imagensAtualizadas = new List<ImagemAtracaoModel>();

			// Atualiza ou cadastra novas imagens
			for (int i = 0; i < imagens.Count; i++)
			{
				string imagem = imagens[i];
				string legenda = legendas[i];

				// Verifica se a imagem já existe na lista de imagens relacionadas à atração
				ImagemAtracaoModel imagemExistente = imagensAtracao.FirstOrDefault(img => img.Imagem == imagem);

				if (imagemExistente != null)
				{
					// Se a imagem existe, atualiza a legenda se necessário
					if (imagemExistente.LegendaImagem != legenda)
					{
						imagemExistente.LegendaImagem = legenda;
						// Atualiza a imagem no banco de dados (se necessário)
						await _ImagemAtracaoRepositorio.Atualizar(imagemExistente, imagemExistente.Id);
					}
				}
				else
				{
					// Se a imagem não existe, cadastra uma nova imagem
					ImagemAtracaoModel novaImagem = new ImagemAtracaoModel { IdAtracao = id, Imagem = imagem, LegendaImagem = legenda };
					// Insere a nova imagem no banco de dados
					await _ImagemAtracaoRepositorio.Adicionar(novaImagem);
					imagensAtracao.Add(novaImagem); // Adiciona a nova imagem à lista de imagens relacionadas à atração
				}

				// Adiciona a imagem atualizada ou nova à lista de imagens atualizadas
				imagensAtualizadas.Add(new ImagemAtracaoModel { Imagem = imagem, LegendaImagem = legenda });
			}

			// Remove as imagens que foram excluídas
			foreach (var imagem in imagensAtracao)
			{
				if (!imagens.Contains(imagem.Imagem))
				{
					// Remove a imagem do banco de dados
					await _ImagemAtracaoRepositorio.Apagar(imagem.Id);
				}
			}

			// Retorna a lista de imagens atualizadas
			return Ok(imagensAtualizadas);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImagemAtracaoModel>> Apagar(int id)
		{
			bool apagado = await _ImagemAtracaoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}

