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

	public class ImagemTurismoController : ControllerBase
	{
		private readonly IImagemTurismoRepositorio _ImagemTurismoRepositorio;
		private readonly ITurismoRepositorio _TurismoRepositorio;

		public ImagemTurismoController(IImagemTurismoRepositorio ImagemTurismoRepositorio, ITurismoRepositorio TurismoRepositorio)
		{
			_ImagemTurismoRepositorio = ImagemTurismoRepositorio;
			_TurismoRepositorio = TurismoRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<ImagemTurismoModel>>> BuscarImagemTurismo()
		{
			List<ImagemTurismoModel> imagemTurismo = await _ImagemTurismoRepositorio.BuscarImagemTurismo();
			return Ok(imagemTurismo);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ImagemTurismoModel>> BuscarPorId(int id)
		{
			ImagemTurismoModel imagemTurismo = await _ImagemTurismoRepositorio.BuscarPorId(id);
			if (imagemTurismo == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada.");
			}

			return Ok(imagemTurismo);
		}

		[HttpPost]
		public async Task<ActionResult<ImagemTurismoModel>> Cadastrar([FromForm] ImagemTurismoModel ImagemTurismoModel)
		{
			ImagemTurismoModel imagemTurismo = await _ImagemTurismoRepositorio.Adicionar(ImagemTurismoModel);

			return Ok(imagemTurismo);
		}

		[HttpPost("{id}/CadastrarImagensTurismo")]
		public async Task<ActionResult<List<ImagemTurismoModel>>> CadastrarImagensTurismo([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id, [FromForm] int idUsuario)
		{
			TurismoModel Turismo = await _TurismoRepositorio.BuscarPorId(id);
			if (Turismo == null)
			{
				return NotFound($"Turismo com ID {id} não encontrada!");
			}

			List<ImagemTurismoModel> imagensTurismoModel = new List<ImagemTurismoModel>();
			for (int i = 0; i < imagens.Count; i++)
			{
				ImagemTurismoModel novaImagem = new ImagemTurismoModel()
				{
					IdTurismo = id,
					Imagem = imagens[i],
					LegendaImagem = legendas[i],
					IdUsuario = idUsuario
				};

				await _ImagemTurismoRepositorio.Adicionar(novaImagem);
				imagensTurismoModel.Add(novaImagem);
			}


			return Ok(imagensTurismoModel);
		}


		[HttpPut("{id}")]
		public async Task<ActionResult<ImagemTurismoModel>> Atualizar([FromForm] ImagemTurismoModel ImagemTurismoModel, int id)
		{
			ImagemTurismoModel imagemTurismo = await _ImagemTurismoRepositorio.Atualizar(ImagemTurismoModel, id);

			return Ok(imagemTurismo);
		}

		[HttpPut("{id}/AtualizarImagensTurismo")]
		public async Task<ActionResult<List<ImagemTurismoModel>>> AtualizarImagensTurismo([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id, [FromForm] int idUsuario)
		{
			TurismoModel Turismo = await _TurismoRepositorio.BuscarPorId(id);
			if (Turismo == null)
			{
				return NotFound($"Atração com ID {id} não encontrada!");
			}

			// Busca as imagens relacionadas à atração no banco de dados
			List<ImagemTurismoModel> imagensTurismo = await _TurismoRepositorio.BuscarImagensPorTurismoId(id);

			List<ImagemTurismoModel> imagensAtualizadas = new List<ImagemTurismoModel>();

			// Atualiza ou cadastra novas imagens
			for (int i = 0; i < imagens.Count; i++)
			{
				string imagem = imagens[i];
				string legenda = legendas[i];

				// Verifica se a imagem já existe na lista de imagens relacionadas à atração
				ImagemTurismoModel imagemExistente = imagensTurismo.FirstOrDefault(img => img.Imagem == imagem);

				if (imagemExistente != null)
				{
					// Se a imagem existe, atualiza a legenda se necessário
					if (imagemExistente.LegendaImagem != legenda)
					{
						imagemExistente.LegendaImagem = legenda;
						// Atualiza a imagem no banco de dados (se necessário)
						await _ImagemTurismoRepositorio.Atualizar(imagemExistente, imagemExistente.Id);
					}
				}
				else
				{
					// Se a imagem não existe, cadastra uma nova imagem
					ImagemTurismoModel novaImagem = new ImagemTurismoModel { IdTurismo = id, Imagem = imagem, LegendaImagem = legenda, IdUsuario = idUsuario };
					// Insere a nova imagem no banco de dados
					await _ImagemTurismoRepositorio.Adicionar(novaImagem);
					imagensTurismo.Add(novaImagem); // Adiciona a nova imagem à lista de imagens relacionadas à atração
				}

				// Adiciona a imagem atualizada ou nova à lista de imagens atualizadas
				imagensAtualizadas.Add(new ImagemTurismoModel { Imagem = imagem, LegendaImagem = legenda });
			}

			// Remove as imagens que foram excluídas
			foreach (var imagem in imagensTurismo)
			{
				if (!imagens.Contains(imagem.Imagem))
				{
					// Remove a imagem do banco de dados
					await _ImagemTurismoRepositorio.Apagar(imagem.Id);
				}
			}

			// Retorna a lista de imagens atualizadas
			return Ok(imagensAtualizadas);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImagemTurismoModel>> Apagar(int id)
		{
			bool apagado = await _ImagemTurismoRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}

