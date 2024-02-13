using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface INoticiaRepository
    {
        Task<List<NoticiaModel>> BuscarNoticia();
        Task<NoticiaModel> BuscarPorId(int id);
        Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel);
        Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, int id);
        Task<bool> Apagar(int id, IWebHostEnvironment hostingEnvironment);
        Task<string> SalvarImagem(IFormFile imagem, IWebHostEnvironment hostingEnvironment);
        Task<string> ExcluirImagem(string imagePath, IWebHostEnvironment hostingEnvironment);
        Task<string> AtualizarImagem(int id, IFormFile imagem, IWebHostEnvironment hostingEnvironment); // Adicionando método para atualizar imagem no escopo da repository
    }
}