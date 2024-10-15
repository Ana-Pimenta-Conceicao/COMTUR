using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAtaRepositorio
	{
		Task<IEnumerable<AtaModel>> GetAll();
		Task<IEnumerable<AtaModel>> GetByProcess(Guid idAta);
		Task<AtaModel> GetById(Guid id);
		Task<AtaModel> Create(AtaModel AtaModel);
		Task<AtaModel> Update(AtaModel AtaModel);
		Task<AtaModel> Delete(Guid id);
	}
}
