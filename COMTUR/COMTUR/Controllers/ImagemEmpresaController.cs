using COMTUR.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using COMTUR.Repositorios.Interfaces;
using System.Collections.Generic;

namespace COMTUR.Controllers
{
	[Route("api/[controller]")]
	[ApiController]

	public class ImagemEmpresaController : ControllerBase
	{
		private readonly IImagemEmpresaRepositorio _ImagemEmpresaRepositorio;
		private readonly IEmpresaRepositorio _EmpresaRepositorio;

		public ImagemEmpresaController(IImagemEmpresaRepositorio ImagemEmpresaRepositorio, IEmpresaRepositorio EmpresaRepositorio)
		{
			_ImagemEmpresaRepositorio = ImagemEmpresaRepositorio;
			_EmpresaRepositorio = EmpresaRepositorio;
		}

		[HttpGet]
		public async Task<ActionResult<List<ImagemEmpresaModel>>> BuscarImagemEmpresa()
		{
			List<ImagemEmpresaModel> imagemEmpresa = await _ImagemEmpresaRepositorio.BuscarImagemEmpresa();
			return Ok(imagemEmpresa);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ImagemEmpresaModel>> BuscarPorId(int id)
		{
			ImagemEmpresaModel imagemEmpresa = await _ImagemEmpresaRepositorio.BuscarPorId(id);
			if (imagemEmpresa == null)
			{
				return NotFound($"Empresa com ID {id} não encontrada.");
			}

			return Ok(imagemEmpresa);
		}

		[HttpPost]
		public async Task<ActionResult<ImagemEmpresaModel>> Cadastrar([FromForm] ImagemEmpresaModel ImagemEmpresaModel)
		{
			ImagemEmpresaModel imagemEmpresa = await _ImagemEmpresaRepositorio.Adicionar(ImagemEmpresaModel);

			return Ok(imagemEmpresa);
		}

		[HttpPost("{id}/CadastrarImagensEmpresa")]
		public async Task<ActionResult<List<ImagemEmpresaModel>>> CadastrarImagensEmpresa([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id, [FromForm] int idUsuario)
		{
			EmpresaModel empresa = await _EmpresaRepositorio.BuscarPorId(id);
			if (empresa == null)
			{
				return NotFound($"Empresa com ID {id} não encontrada!");
			}

			List<ImagemEmpresaModel> imagensEmpresaModel = new List<ImagemEmpresaModel>();
			for (int i = 0; i < imagens.Count; i++)
			{
				ImagemEmpresaModel novaImagem = new ImagemEmpresaModel()
				{
					IdEmpresa = id,
					Imagem = imagens[i],
					LegendaImagem = legendas[i],
					IdUsuario = idUsuario
				};

				await _ImagemEmpresaRepositorio.Adicionar(novaImagem);
				imagensEmpresaModel.Add(novaImagem);
			}


			return Ok(imagensEmpresaModel);
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<ImagemEmpresaModel>> Atualizar([FromForm] ImagemEmpresaModel ImagemEmpresaModel, int id)
		{
			ImagemEmpresaModel imagemEmpresa = await _ImagemEmpresaRepositorio.Atualizar(ImagemEmpresaModel, id);

			return Ok(imagemEmpresa);
		}

		[HttpPut("{id}/AtualizarImagensEmpresa")]
		public async Task<ActionResult<List<ImagemEmpresaModel>>> AtualizarImagensEmpresa([FromForm] List<string> imagens, [FromForm] List<string> legendas, int id)
		{
			EmpresaModel empresa = await _EmpresaRepositorio.BuscarPorId(id);
			if (empresa == null)
			{
				return NotFound($"Empresa com ID {id} não encontrada!");
			}

			// Busca as imagens relacionadas à empresa no banco de dados
			List<ImagemEmpresaModel> imagensEmpresa = await _EmpresaRepositorio.BuscarImagensPorEmpresaId(id);

			List<ImagemEmpresaModel> imagensAtualizadas = new List<ImagemEmpresaModel>();

			// Atualiza ou cadastra novas imagens
			for (int i = 0; i < imagens.Count; i++)
			{
				string imagem = imagens[i];
				string legenda = legendas[i];

				// Verifica se a imagem já existe na lista de imagens relacionadas à empresa
				ImagemEmpresaModel imagemExistente = imagensEmpresa.FirstOrDefault(img => img.Imagem == imagem);

				if (imagemExistente != null)
				{
					// Se a imagem existe, atualiza a legenda se necessário
					if (imagemExistente.LegendaImagem != legenda)
					{
						imagemExistente.LegendaImagem = legenda;
						// Atualiza a imagem no banco de dados (se necessário)
						await _ImagemEmpresaRepositorio.Atualizar(imagemExistente, imagemExistente.Id);
					}
				}
				else
				{
					// Se a imagem não existe, cadastra uma nova imagem
					ImagemEmpresaModel novaImagem = new ImagemEmpresaModel { IdEmpresa = id, Imagem = imagem, LegendaImagem = legenda };
					// Insere a nova imagem no banco de dados
					await _ImagemEmpresaRepositorio.Adicionar(novaImagem);
					imagensEmpresa.Add(novaImagem); // Adiciona a nova imagem à lista de imagens relacionadas à empresa
				}

				// Adiciona a imagem atualizada ou nova à lista de imagens atualizadas
				imagensAtualizadas.Add(new ImagemEmpresaModel { Imagem = imagem, LegendaImagem = legenda });
			}

			// Remove as imagens que foram excluídas
			foreach (var imagem in imagensEmpresa)
			{
				if (!imagens.Contains(imagem.Imagem))
				{
					// Remove a imagem do banco de dados
					await _ImagemEmpresaRepositorio.Apagar(imagem.Id);
				}
			}

			// Retorna a lista de imagens atualizadas
			return Ok(imagensAtualizadas);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImagemEmpresaModel>> Apagar(int id)
		{
			bool apagado = await _ImagemEmpresaRepositorio.Apagar(id);
			return Ok(apagado);
		}
	}
}

