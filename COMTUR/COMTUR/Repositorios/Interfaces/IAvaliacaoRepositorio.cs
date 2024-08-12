using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAvaliacaoRepositorio
	{
		Task<List<AvaliacaoModel>> BuscarAvaliacao();
		Task<AvaliacaoModel> BuscarPorId(int id);
		Task<AvaliacaoModel> BuscarIdAtracao(int id);
		Task<AvaliacaoModel> BuscarIdTurismo(int id);
		Task<AvaliacaoModel> BuscarIdUsuario(int id);
		Task<AvaliacaoModel> Adicionar(AvaliacaoModel Avaliacao);
		Task<AvaliacaoModel> Atualizar(AvaliacaoModel Avaliacao, int id);
		Task<bool> Apagar(int id);
	}
}
