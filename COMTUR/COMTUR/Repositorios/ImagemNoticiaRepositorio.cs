using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class ImagemNoticiaRepositorio : IImagemNoticiaRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;
		public ImagemNoticiaRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = webHostEnvironment;
		}

		public async Task<ImagemNoticiaModel> BuscarPorId(int id)
		{
			return await _dbContext.ImagemNoticia.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ImagemNoticiaModel> GetById(int id)
		{
			return await _dbContext.ImagemNoticia.Include(objeto => objeto.NoticiaModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<ImagemNoticiaModel>> BuscarImagemNoticia()
		{
			return await _dbContext.ImagemNoticia.ToListAsync();
		}

		public async Task<ImagemNoticiaModel> Adicionar(ImagemNoticiaModel imagemNoticia)
		{
			await _dbContext.ImagemNoticia.AddAsync(imagemNoticia);
			await _dbContext.SaveChangesAsync();

			return imagemNoticia;
		}

		public async Task<ImagemNoticiaModel> Atualizar(ImagemNoticiaModel imagemNoticia, int id)
		{
			ImagemNoticiaModel ImagemNoticiaPorId = await BuscarPorId(id);
			if (ImagemNoticiaPorId == null)
			{
				throw new Exception($"ImagemNoticia para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			ImagemNoticiaPorId.Id = imagemNoticia.Id;
			ImagemNoticiaPorId.Imagem = imagemNoticia.Imagem;

			_dbContext.ImagemNoticia.Update(ImagemNoticiaPorId);
			await _dbContext.SaveChangesAsync();

			return ImagemNoticiaPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			ImagemNoticiaModel ImagemNoticiaPorId = await BuscarPorId(id);
			if (ImagemNoticiaPorId == null)
			{
				throw new Exception($"ImagemNoticia para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			_dbContext.ImagemNoticia.Remove(ImagemNoticiaPorId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}
}
