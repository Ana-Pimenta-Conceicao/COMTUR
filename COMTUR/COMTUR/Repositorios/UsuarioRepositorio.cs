using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class UsuarioRepositorio : IUsuarioRepositorio
	{
		private readonly IUsuarioRepositorio _usuarioRepositorio;
		private readonly IMapper _mapper;
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

		public async Task<List<UsuarioModel>> ListarPorTipoUsuario(int tipoUsuario)
		{
			return await _dbContext.Usuario
				.Where(x => (int)x.TipoUsuario == tipoUsuario)
				.ToListAsync();
		}

		public async Task<UsuarioModel> Adicionar(UsuarioModel usuarioModel)
		{
			if (!Enum.IsDefined(typeof(TipoUsuario), usuarioModel.TipoUsuario))
			{
				throw new ArgumentException("Tipo de usuário inválido");
			}

			await _dbContext.Usuario.AddAsync(usuarioModel);
			await _dbContext.SaveChangesAsync();

			return usuarioModel;
		}

		public async Task<UsuarioModel> Atualizar(UsuarioModel usuarioModel, int id)
		{
			UsuarioModel usuarioPorId = await BuscarPorId(id);
			if (usuarioPorId == null)
			{
				throw new Exception($"Usuário {id} não foi encontrado no banco de dados.");
			}

			if (!Enum.IsDefined(typeof(TipoUsuario), usuarioModel.TipoUsuario))
			{
				throw new ArgumentException("Tipo de usuário inválido");
			}

			usuarioPorId.Nome = usuarioModel.Nome;
			usuarioPorId.Telefone = usuarioModel.Telefone;
			usuarioPorId.EmailUsuario = usuarioModel.EmailUsuario;
			usuarioPorId.SenhaUsuario = usuarioModel.SenhaUsuario;
			usuarioPorId.ImagemPerfilUsuario = usuarioModel.ImagemPerfilUsuario;
			usuarioPorId.TipoUsuario = usuarioModel.TipoUsuario; // Atualizar o tipo de usuário

			_dbContext.Usuario.Update(usuarioPorId);
			await _dbContext.SaveChangesAsync();

			return usuarioPorId;
		}

		public async Task<bool> Apagar(int id)
		{
			UsuarioModel usuarioPorId = await BuscarPorId(id);

			if (usuarioPorId == null)
			{
				throw new Exception($"Usuário {id} não foi encontrado");
			}

			_dbContext.Usuario.Remove(usuarioPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}

		public async Task<UsuarioModel> Autenticacao(LoginModel loginModel)
		{
			var autenticacao = _mapper.Map<LoginModel>(loginModel);
			var usuario = await _usuarioRepositorio.Autenticacao(autenticacao);

			UsuarioModel usuarioModel = _mapper.Map<UsuarioModel>(usuario);
			if (usuarioModel != null)
			{
				usuarioModel.TipoUsuario = (TipoUsuario)usuario.TipoUsuario; // Convertendo o valor do enum
			}

			return usuarioModel;
		}


		public async Task<UsuarioModel> ValidarLogin(string email, string senha)
		{
			return await _dbContext.Usuario.FirstOrDefaultAsync(u => u.EmailUsuario == email && u.SenhaUsuario == senha);
		}
	}
}