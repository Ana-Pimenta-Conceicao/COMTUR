using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IEmpresarioRepositorio
	{
		Task<List<EmpresarioModel>> BuscarEmpresario();
		Task<EmpresarioModel> BuscarPorId(int id);
		Task<EmpresarioModel> Adicionar(EmpresarioModel empresario);
		Task<EmpresarioModel> Atualizar(EmpresarioModel empresario, int id);
		Task<bool> Apagar(int id);
	}
}
