using COMTUR.Models;
using Microsoft.AspNetCore.Mvc;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IUsuarioRepositorio
	{
		Task<List<UsuarioModel>> BuscarUsuario();
		Task<UsuarioModel> BuscarPorId(int id);
		Task<UsuarioModel> Adicionar(UsuarioModel Usuario);
		Task<UsuarioModel> Atualizar(UsuarioModel Usuario, int id);
		Task<List<UsuarioModel>> ListarPorTipoUsuario(int tipoUsuario);
        Task<bool> Apagar(int id);
	}
}
