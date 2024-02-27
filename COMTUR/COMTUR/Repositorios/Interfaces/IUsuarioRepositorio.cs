using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IUsuarioRepositorio
	{
		Task<List<UsuarioModel>> BuscarUsuario();
		Task<UsuarioModel> BuscarPorId(int id);
		Task<UsuarioModel> Adicionar(UsuarioModel Usuario);
		Task<UsuarioModel> Atualizar(UsuarioModel Usuario, int id);
		Task<bool> Apagar(int id);
	}
}
