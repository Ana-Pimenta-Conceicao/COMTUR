using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IEmpresarioRepositorio
	{
		Task<List<EmpresarioModel>> BuscarEmpresario();
		Task<EmpresarioModel> BuscarPorNome(string nome);
		Task<EmpresarioModel> Adicionar(EmpresarioModel empresario);
		Task<EmpresarioModel> Atualizar(EmpresarioModel empresario, string nome);
		Task<bool> Apagar(string nome);
	}
}
