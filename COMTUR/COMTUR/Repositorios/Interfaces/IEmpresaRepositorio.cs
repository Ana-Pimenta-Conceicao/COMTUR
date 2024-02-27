using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IEmpresaRepositorio
	{
		Task<List<EmpresaModel>> BuscarEmpresa();
		Task<EmpresaModel> BuscarPorId(int id);
		Task<EmpresaModel> GetById(int id);
		Task<EmpresaModel> Adicionar(EmpresaModel empresaModel);
		Task<EmpresaModel> Atualizar(EmpresaModel empresaModel, int id);
		Task<bool> Apagar(int id);
	}
}
