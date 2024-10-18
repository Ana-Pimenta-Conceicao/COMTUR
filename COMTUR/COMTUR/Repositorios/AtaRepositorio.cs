using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace COMTUR.Repositorios
{
	public class AtaRepositorio : IAtaRepositorio
	{
		private readonly ComturDBContext _dbContext;

		public AtaRepositorio(ComturDBContext AtadbContext)
		{
			_dbContext = AtadbContext;
		}

		public async Task<IEnumerable<AtaModel>> GetAll()
		{
			return await _dbContext.Ata.AsNoTracking().ToListAsync();
		}

		public async Task<IEnumerable<AtaModel>> GetByProcess(Guid idAta)
		{
			return await _dbContext.Ata.AsNoTracking().Where(da => da.Id == idAta).ToListAsync();
		}

		public async Task<AtaModel> GetById(Guid id)
		{
			return await _dbContext.Ata.AsNoTracking().FirstOrDefaultAsync(da => da.Id == id);
		}

		public async Task<AtaModel> Create(AtaModel AtaModel)
		{
			_dbContext.Ata.Add(AtaModel);
			await _dbContext.SaveChangesAsync();
			return AtaModel;
		}

		public async Task<AtaModel> Update(AtaModel AtaModel)
		{
			_dbContext.Entry(AtaModel).State = EntityState.Modified;
			await _dbContext.SaveChangesAsync();
			return AtaModel;
		}

		public async Task<AtaModel> Delete(Guid id)
		{
			var AtaModel = await GetById(id);
			_dbContext.Ata.Remove(AtaModel);
			await _dbContext.SaveChangesAsync();
			return AtaModel;
		}
	}
}
