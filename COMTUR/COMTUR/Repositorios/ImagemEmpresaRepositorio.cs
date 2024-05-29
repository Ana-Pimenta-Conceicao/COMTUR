using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class ImagemEmpresaRepositorio : IImagemEmpresaRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;
		public ImagemEmpresaRepositorio(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = webHostEnvironment;
		}

		public async Task<ImagemEmpresaModel> BuscarPorId(int id)
		{
			return await _dbContext.ImagemEmpresa.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ImagemEmpresaModel> GetById(int id)
		{
			return await _dbContext.ImagemEmpresa.Include(objeto => objeto.EmpresaModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<ImagemEmpresaModel> GetByIdUsuario(int id)
		{
			return await _dbContext.ImagemEmpresa.Include(objeto => objeto.UsuarioModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<ImagemEmpresaModel>> BuscarImagemEmpresa()
		{
			return await _dbContext.ImagemEmpresa.ToListAsync();
		}


		public async Task<ImagemEmpresaModel> Adicionar(ImagemEmpresaModel imagemEmpresa)
		{
			await _dbContext.ImagemEmpresa.AddAsync(imagemEmpresa);
			await _dbContext.SaveChangesAsync();
			return imagemEmpresa;
		}


		public async Task<ImagemEmpresaModel> Atualizar(ImagemEmpresaModel imagemEmpresa, int id)
		{
			ImagemEmpresaModel imagemEmpresaPorId = await BuscarPorId(id);

			if (imagemEmpresaPorId == null)
			{
				throw new Exception($"ImagemEmpresa para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			// Atualiza a propriedade Imagem
			imagemEmpresaPorId.Imagem = imagemEmpresa.Imagem;
			imagemEmpresaPorId.LegendaImagem = imagemEmpresa.LegendaImagem;

			// Verifica se o ID da empresa associada foi alterado
			if (imagemEmpresaPorId.IdEmpresa != imagemEmpresa.IdEmpresa)
			{
				// Atualiza o ID da empresa associada
				imagemEmpresaPorId.IdEmpresa = imagemEmpresa.IdEmpresa;
			}

			_dbContext.ImagemEmpresa.Update(imagemEmpresaPorId);
			await _dbContext.SaveChangesAsync();

			return imagemEmpresaPorId;
		}


		public async Task<bool> Apagar(int id)
		{
			ImagemEmpresaModel ImagemEmpresaPorId = await BuscarPorId(id);
			if (ImagemEmpresaPorId == null)
			{
				throw new Exception($"ImagemEmpresa para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			_dbContext.ImagemEmpresa.Remove(ImagemEmpresaPorId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}
}
