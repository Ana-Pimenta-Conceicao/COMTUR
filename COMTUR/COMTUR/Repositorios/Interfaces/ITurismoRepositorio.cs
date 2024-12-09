using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface ITurismoRepositorio
	{
		Task<List<TurismoModel>> BuscarTurismo();
		Task<TurismoModel> BuscarPorId(int id);
		Task<TurismoModel> GetByIdUsuario(int id);
		Task<TurismoModel> GetByIdTipoTurismo(int id);
		Task<TurismoModel> Adicionar(TurismoModel TurismoModel);
		Task<TurismoModel> Atualizar(TurismoModel TurismoModel, int id);
		Task<bool> Apagar(int id);
		Task<List<ImagemTurismoModel>> BuscarImagensPorTurismoId(int turismoId);
	}
}
