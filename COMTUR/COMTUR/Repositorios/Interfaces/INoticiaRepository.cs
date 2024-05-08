using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface INoticiaRepository
    {
        Task<List<NoticiaModel>> BuscarNoticia();
        Task<NoticiaModel> BuscarPorId(int id);
        Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel);
        Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, int id);
        Task<bool> Apagar(int id);
		Task<List<NoticiaModel>> ListarPorTipoStatus(int tipoStatus);
		Task<List<ImagemNoticiaModel>> BuscarImagensPorNoticiaId(int noticiaId);
    }
}