using Microsoft.EntityFrameworkCore;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.Extensions.Hosting.Internal;
using COMTUR.Models.Enum;

namespace COMTUR.Repositorios
{
	public class AnuncioRepositorio : IAnuncioRepositorio
	{
		private readonly ComturDBContext _dbContext;
		private readonly IWebHostEnvironment _hostingEnvironment;
		public AnuncioRepositorio(ComturDBContext AnuncioDBContext, IWebHostEnvironment hostingEnvironment)
		{
			_dbContext = AnuncioDBContext;
			_hostingEnvironment = hostingEnvironment;
		}

		public async Task<AnuncioModel> BuscarPorId(int id)
		{
			return await _dbContext.Anuncio.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AnuncioModel> GetByIdEmpresa(int id)
		{
			return await _dbContext.Anuncio.Include(objeto => objeto.EmpresaModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AnuncioModel> GetByIdTipoTurismo(int id)
		{
			return await _dbContext.Anuncio.Include(objeto => objeto.TipoTurismoModel).Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		/*public async Task<List<AnuncioModel>> ListarPorTipoStatus(int tipoStatus)
		{
			return await _dbContext.Anuncio
				.Where(x => (int)x.TipoStatus == tipoStatus)
				.ToListAsync();
		}*/

		public async Task<List<AnuncioModel>> BuscarAnuncio()
		{
			return await _dbContext.Anuncio.ToListAsync();
		}

		public async Task<AnuncioModel> Adicionar(AnuncioModel Anuncio)
		{
			/*if (!Enum.IsDefined(typeof(TipoStatus), Anuncio.TipoStatus))
			{
				throw new ArgumentException("Tipo de status inválido");
			}*/

			await _dbContext.Anuncio.AddAsync(Anuncio);
			await _dbContext.SaveChangesAsync();

			return Anuncio;
		}

		public async Task<AnuncioModel> Atualizar(AnuncioModel Anuncio, int id)
		{
			AnuncioModel AnuncioPorId = await BuscarPorId(id);

			if (AnuncioPorId == null)
			{
				throw new Exception($"Anuncio para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			AnuncioPorId.Id = Anuncio.Id;
			AnuncioPorId.NomeEmpresa = Anuncio.NomeEmpresa;
			AnuncioPorId.Imagem = Anuncio.Imagem;
			AnuncioPorId.Legenda = Anuncio.Legenda;
			AnuncioPorId.DescricaoAnuncio = Anuncio.DescricaoAnuncio;
			//AnuncioPorId.TipoStatus = Anuncio.TipoStatus;


			_dbContext.Anuncio.Update(AnuncioPorId);
			await _dbContext.SaveChangesAsync();

			return AnuncioPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			AnuncioModel AnuncioPorId = await BuscarPorId(id);
			if (AnuncioPorId == null)
			{
				throw new Exception($"Anuncio para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			_dbContext.Anuncio.Remove(AnuncioPorId);
			await _dbContext.SaveChangesAsync();
			return true;
		}
	}
}