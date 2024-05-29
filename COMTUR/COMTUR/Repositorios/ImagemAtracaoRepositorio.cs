using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class ImagemAtracaoRepositorio : IImagemAtracaoRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;
		public ImagemAtracaoRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = webHostEnvironment;
		}

		public async Task<ImagemAtracaoModel> BuscarPorId(int id)
		{
			return await _dbContext.ImagemAtracao.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ImagemAtracaoModel> GetByIdAtracao(int id)
		{
			return await _dbContext.ImagemAtracao.Include(objeto => objeto.AtracaoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<ImagemAtracaoModel> GetByIdUsuario(int id)
		{
			return await _dbContext.ImagemAtracao.Include(objeto => objeto.UsuarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<ImagemAtracaoModel>> BuscarImagemAtracao()
		{
			return await _dbContext.ImagemAtracao.ToListAsync();
		}

		public async Task<ImagemAtracaoModel> Adicionar(ImagemAtracaoModel ImagemAtracao)
		{
			await _dbContext.ImagemAtracao.AddAsync(ImagemAtracao);
			await _dbContext.SaveChangesAsync();

			return ImagemAtracao;
		}

		public async Task<ImagemAtracaoModel> Atualizar(ImagemAtracaoModel ImagemAtracao, int id)
		{
			ImagemAtracaoModel ImagemAtracaoPorId = await BuscarPorId(id);
			if (ImagemAtracaoPorId == null)
			{
				throw new Exception($"ImagemAtracao para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			// Atualiza a propriedade Imagem
			ImagemAtracaoPorId.Imagem = ImagemAtracao.Imagem;

			// Verifica se o ID da atracao associada foi alterado
			if (ImagemAtracaoPorId.IdAtracao != ImagemAtracao.IdAtracao)
			{
				// Atualiza o ID da atracao associada
				ImagemAtracaoPorId.IdAtracao = ImagemAtracao.IdAtracao;
			}

			_dbContext.ImagemAtracao.Update(ImagemAtracaoPorId);
			await _dbContext.SaveChangesAsync();

			return ImagemAtracaoPorId;
		}


		public async Task<bool> Apagar(int id)
		{
			ImagemAtracaoModel ImagemAtracaoPorId = await BuscarPorId(id);
			if (ImagemAtracaoPorId == null)
			{
				throw new Exception($"ImagemAtracao para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			_dbContext.ImagemAtracao.Remove(ImagemAtracaoPorId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}
}
