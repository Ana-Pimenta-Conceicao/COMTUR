using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface INoticiaRepositorio
    {
        Task<List<NoticiaModel>> BuscarNoticia();
        Task<NoticiaModel> BuscarPorId(int id);
		Task<NoticiaModel> GetByIdTurismo(int id);
		Task<NoticiaModel> GetByIdUsuario(int id);
		Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel);
        Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, int id);
        Task<bool> Apagar(int id);
		Task<List<ImagemNoticiaModel>> BuscarImagensPorNoticiaId(int noticiaId);
    }
}