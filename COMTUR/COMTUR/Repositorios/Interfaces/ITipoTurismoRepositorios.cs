using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface ITipoTurismoRepositorio
	{
		Task<List<TipoTurismoModel>> BuscarTodosTipoTurismo();
		Task<TipoTurismoModel> BuscarPorNome(string nome);
		Task<TipoTurismoModel> Adicionar(TipoTurismoModel tipo);
		Task<TipoTurismoModel> Atualizar(TipoTurismoModel tipo, string nome);
		Task<bool> Apagar(string nome);
	}
}