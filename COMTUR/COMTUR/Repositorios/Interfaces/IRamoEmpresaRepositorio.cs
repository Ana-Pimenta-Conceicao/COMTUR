using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IRamoEmpresaRepositorio
	{
		Task<List<RamoEmpresaModel>> BuscarRamoEmpresa();
		Task<RamoEmpresaModel> BuscarPorId(int id);
		Task<RamoEmpresaModel> Adicionar(RamoEmpresaModel ramo);
		Task<RamoEmpresaModel> Atualizar(RamoEmpresaModel ramo, int id);
		Task<bool> Apagar(int id);
	}
}