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
        Task<bool> SalvarImagem(IFormFile imagem, string caminhoImagem);
        Task<bool> ExcluirImagem(string nomeImagem);
    }
}
