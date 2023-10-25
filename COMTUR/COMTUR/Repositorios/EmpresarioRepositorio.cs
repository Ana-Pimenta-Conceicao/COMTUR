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
		public async Task<EmpresarioModel> BuscarPorNome(string nome)
		{
			return await _dbContext.Empresario.FirstOrDefaultAsync(x => x.Nome == nome);
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

		public async Task<EmpresarioModel> Atualizar(EmpresarioModel empresarioModel, string nome)
		{
			EmpresarioModel empresarioPorNome = await BuscarPorNome(nome);
			if (empresarioPorNome == null)
			{
				throw new Exception($"Empresário {nome} nao foi encontrado no banco de dados. ");
			}

			empresarioPorNome.Nome = empresarioModel.Nome;

			_dbContext.Empresario.Update(empresarioPorNome);
			await _dbContext.SaveChangesAsync();

			return empresarioPorNome;
		}

		public async Task<bool> Apagar(string nome)
		{
			EmpresarioModel empresarioPorNome = await BuscarPorNome(nome);

			if (empresarioPorNome == null)
			{
				throw new Exception($"Empresário {nome} não foi encontrado");
			}

			_dbContext.Empresario.Remove(empresarioPorNome);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
