using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
	public interface IAnuncioRepositorio
	{
		Task<List<AnuncioModel>> BuscarAnuncio();
		Task<AnuncioModel> GetByIdEmpresa(int id);
		Task<AnuncioModel> GetByIdTipoTurismo(int id);
		Task<AnuncioModel> BuscarPorId(int id);
		Task<AnuncioModel> Adicionar(AnuncioModel Anuncio);
		Task<AnuncioModel> Atualizar(AnuncioModel Anuncio, int id);
		Task<List<AnuncioModel>> ListarPorTipoStatus(int tipoStatus);
		Task<bool> Apagar(int id);
	}
}
