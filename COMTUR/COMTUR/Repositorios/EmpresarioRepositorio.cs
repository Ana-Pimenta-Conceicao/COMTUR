using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class EmpresarioRepositorio : IEmpresarioRepositorio
	{
		private readonly ComturDBContext _dbContext;

		public EmpresarioRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task<EmpresarioModel> BuscarPorId(int id)
		{
			return await _dbContext.Empresario.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<List<EmpresarioModel>> BuscarEmpresario()
		{
			return await _dbContext.Empresario.ToListAsync();
		}

		public async Task<EmpresarioModel> Adicionar(EmpresarioModel empresarioModel)
		{
			await _dbContext.Empresario.AddAsync(empresarioModel);
			await _dbContext.SaveChangesAsync();

			return empresarioModel;
		}

		public async Task<EmpresarioModel> Atualizar(EmpresarioModel empresarioModel, int id)
		{
			EmpresarioModel empresarioPorId = await BuscarPorId(id);
			if (empresarioPorId == null)
			{
				throw new Exception($"Empresário para o ID: {id} nao foi encontrado no banco de dados. ");
			}

			empresarioPorId.Nome = empresarioModel.Nome;

			_dbContext.Empresario.Update(empresarioPorId);
			await _dbContext.SaveChangesAsync();

			return empresarioPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			EmpresarioModel empresarioPorId = await BuscarPorId(id);

			if (empresarioPorId == null)
			{
				throw new Exception($"Empresário{id} não foi encontrado");
			}

			_dbContext.Empresario.Remove(empresarioPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
