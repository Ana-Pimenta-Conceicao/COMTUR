using COMTUR.Models.Enum;
using COMTUR.Models.Relational;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAvaliacaoTurismoRepositorio
	{
		Task<List<AvaliacaoTurismoModel>> BuscarAvaliacaoTurismoModel();
        Task<List<AvaliacaoTurismoModel>> BuscarPorIdTurismo(int idTurismo);
        Task<AvaliacaoTurismoModel> BuscarPorId(int id);
		Task<AvaliacaoTurismoModel> Adicionar(AvaliacaoTurismoModel AvaliacaoTurismoModel);
		Task<AvaliacaoTurismoModel> AtualizarStatus(TipoStatus status, int id);
        Task<bool> Apagar(int id);
	}
}
