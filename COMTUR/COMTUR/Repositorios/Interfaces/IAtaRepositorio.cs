using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAtaRepositorio
	{
		Task<List<AtaModel>> BuscarAta();
		Task<AtaModel> BuscarPorId(Guid id);
		Task<AtaModel> Adicionar(AtaModel ataModel);
		Task<AtaModel> Atualizar(AtaModel ataModel, Guid id);
		Task<bool> Apagar(Guid id);
	}
}