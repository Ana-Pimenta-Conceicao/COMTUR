using COMTUR.Models.Enum;
using COMTUR.Models.Relational;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAvaliacaoAtracaoRepositorio
	{
		Task<List<AvaliacaoAtracaoModel>> BuscarAvaliacaoAtracaoModel();
        Task<List<AvaliacaoAtracaoModel>> BuscarPorIdAtracao(int idAtracao);
        Task<AvaliacaoAtracaoModel> BuscarPorId(int id);
		Task<AvaliacaoAtracaoModel> Adicionar(AvaliacaoAtracaoModel AvaliacaoAtracaoModel);
		Task<AvaliacaoAtracaoModel> AtualizarStatus(TipoStatus status, int id);
        Task<bool> Apagar(int id);
	}
}
