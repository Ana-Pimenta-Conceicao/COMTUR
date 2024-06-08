using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface ITipoTurismoRepositorio
	{
		Task<List<TipoTurismoModel>> BuscarTodosTipoTurismo();
		Task<TipoTurismoModel> BuscarPorId(int id);
		Task<TipoTurismoModel> GetByIdUsuario(int id);
		Task<TipoTurismoModel> Adicionar(TipoTurismoModel tipo);
		Task<TipoTurismoModel> Atualizar(TipoTurismoModel tipo, int id);
		Task<bool> Apagar(int id);
	}
}