using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization.Metadata;

namespace COMTUR.Repositorios
{
	public class EmpresarioRepositorio : IEmpresarioRepositorio
	{
		private readonly ComturDBContext _dbContext;

		private readonly IWebHostEnvironment _hostingEnvironment;

		public EmpresarioRepositorio(ComturDBContext dbContext, IWebHostEnvironment hostingEnvironment)
		{
			_dbContext = dbContext;
			_hostingEnvironment = hostingEnvironment;
		}
		public async Task<EmpresarioModel> BuscarPorId(int id)
		{
			return await _dbContext.Empresario.Where(x => x.Id == id).FirstOrDefaultAsync();
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
				throw new Exception($"Empresário {id} nao foi encontrado no banco de dados. ");
			}

			empresarioPorId.Id = empresarioModel.Id;
			empresarioPorId.Nome = empresarioModel.Nome;
			empresarioPorId.EmailEmpresario = empresarioModel.EmailEmpresario;
			empresarioPorId.SenhaEmpresario = empresarioModel.SenhaEmpresario;
			empresarioPorId.TelefoneEmpresario = empresarioModel.TelefoneEmpresario;
			empresarioPorId.ImagemPerfilEmpresario = empresarioModel.ImagemPerfilEmpresario;

			_dbContext.Empresario.Update(empresarioPorId);
			await _dbContext.SaveChangesAsync();

			return empresarioPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			EmpresarioModel empresarioPorId = await BuscarPorId(id);

			if (empresarioPorId == null)
			{
				throw new Exception($"Empresário {id} não foi encontrado");
			}

			_dbContext.Empresario.Remove(empresarioPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
