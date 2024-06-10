using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IUsuarioRepositorio
	{
		Task<List<UsuarioModel>> BuscarUsuario();
		Task<UsuarioModel> BuscarPorId(int id);
		Task<UsuarioModel> BuscarPorEmail(string email);
        Task<UsuarioModel> Adicionar(UsuarioModel Usuario);
		Task<UsuarioModel> Atualizar(UsuarioModel Usuario, int id);
		Task<List<UsuarioModel>> ListarPorTipoUsuario(int tipoUsuario);
		//Task<List<UsuarioModel>> ListarPorTipoStatus(int tipoStatus);
		Task<bool> Apagar(int id);
		Task<UsuarioModel> Autenticacao(LoginModel loginModel);
	}
}
