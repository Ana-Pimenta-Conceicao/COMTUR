using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface INoticiaRepository
    {
        Task<List<NoticiaModel>> BuscarNoticia();
        Task<NoticiaModel> BuscarPorNome(string titulo);
        Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel);
        Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, string titulo);
        Task<bool> Apagar(string titulo);
    }
}
