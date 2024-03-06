using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization.Metadata;

namespace COMTUR.Repositorios
{
	public class UsuarioRepositorio : IUsuarioRepositorio
	{
		private readonly ComturDBContext _dbContext;

		public UsuarioRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task<UsuarioModel> BuscarPorId(int id)
		{
			return await _dbContext.Usuario.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<List<UsuarioModel>> BuscarUsuario()
		{
			return await _dbContext.Usuario.ToListAsync();
		}

		public async Task<UsuarioModel> Adicionar(UsuarioModel UsuarioModel)
		{
			await _dbContext.Usuario.AddAsync(UsuarioModel);
			await _dbContext.SaveChangesAsync();

			return UsuarioModel;
		}

		public async Task<UsuarioModel> Atualizar(UsuarioModel UsuarioModel, int id)
		{
			UsuarioModel UsuarioPorId = await BuscarPorId(id);
			if (UsuarioPorId == null)
			{
				throw new Exception($"Empresário {id} nao foi encontrado no banco de dados. ");
			}

			UsuarioPorId.Id = UsuarioModel.Id;
			UsuarioPorId.Nome = UsuarioModel.Nome;
			UsuarioPorId.EmailUsuario = UsuarioModel.EmailUsuario;
			UsuarioPorId.SenhaUsuario = UsuarioModel.SenhaUsuario;
			UsuarioPorId.ImagemPerfilUsuario = UsuarioModel.ImagemPerfilUsuario;

			_dbContext.Usuario.Update(UsuarioPorId);
			await _dbContext.SaveChangesAsync();

			return UsuarioPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			UsuarioModel UsuarioPorId = await BuscarPorId(id);

			if (UsuarioPorId == null)
			{
				throw new Exception($"Empresário {id} não foi encontrado");
			}

			_dbContext.Usuario.Remove(UsuarioPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
