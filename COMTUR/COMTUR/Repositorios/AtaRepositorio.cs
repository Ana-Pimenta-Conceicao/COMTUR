using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class AtaRepositorio : IAtaRepositorio
	{
		private readonly ComturDBContext _dbContext;
		private readonly IWebHostEnvironment _hostingEnvironment;

		public AtaRepositorio(ComturDBContext dbContext, IWebHostEnvironment hostingEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = hostingEnvironment;
		}

		public async Task<AtaModel> BuscarPorId(Guid id)
		{
			return await _dbContext.Ata.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<List<AtaModel>> BuscarAta()
		{
			return await _dbContext.Ata.AsNoTracking().ToListAsync();
		}

		public async Task<AtaModel> Adicionar(AtaModel ataModel)
		{

			await _dbContext.Ata.AddAsync(ataModel);
			await _dbContext.SaveChangesAsync();

			return ataModel;
		}

		public async Task<AtaModel> Atualizar(AtaModel AtaModel, Guid id)
		{
			AtaModel ataPorId = await BuscarPorId(id);

			if (ataPorId == null)
			{
				throw new Exception($"Ata {id} não foi encontrada no banco de dados.");
			}

			ataPorId.TituloAta = AtaModel.TituloAta;
			ataPorId.DocumentoAta = AtaModel.DocumentoAta;
			ataPorId.DataAta = AtaModel.DataAta;

			_dbContext.Ata.Update(ataPorId);
			await _dbContext.SaveChangesAsync();

			return ataPorId;
		}


		public async Task<bool> Apagar(Guid id)
		{
			var ataParaExcluir = await BuscarPorId(id);

			if (ataParaExcluir == null)
			{
				throw new Exception($"Ata {id} não foi encontrada");
			}

			_dbContext.Ata.Remove(ataParaExcluir);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}