using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IImagemTurismoRepositorio
	{
		Task<List<ImagemTurismoModel>> BuscarImagemTurismo();
		//Task<ImagemTurismoModel> GetById(int id);
		Task<ImagemTurismoModel> BuscarPorId(int id);
		Task<ImagemTurismoModel> Adicionar(ImagemTurismoModel imagemTurismo);
		Task<ImagemTurismoModel> Atualizar(ImagemTurismoModel imagemTurismo, int id);
		Task<bool> Apagar(int id);

	}
}
