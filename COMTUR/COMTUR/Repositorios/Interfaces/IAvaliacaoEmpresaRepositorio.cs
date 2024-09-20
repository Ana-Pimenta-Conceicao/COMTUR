using COMTUR.Models.Enum;
using COMTUR.Models.Relational;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAvaliacaoEmpresaRepositorio
	{
		Task<List<AvaliacaoEmpresaModel>> BuscarAvaliacaoEmpresaModel();
        Task<List<AvaliacaoEmpresaModel>> BuscarPorIdEmpresa(int idEmpresa);
        Task<AvaliacaoEmpresaModel> BuscarPorId(int id);
		Task<AvaliacaoEmpresaModel> Adicionar(AvaliacaoEmpresaModel AvaliacaoEmpresaModel);
		Task<AvaliacaoEmpresaModel> AtualizarStatus(TipoStatus status, int id);
        Task<bool> Apagar(int id);
	}
}
