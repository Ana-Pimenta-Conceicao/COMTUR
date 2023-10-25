using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface ITipoAtracaoRepositorio
    {
        Task<List<TipoAtracaoModel>> BuscarTipoAtracao();
        Task<TipoAtracaoModel> BuscarPorNome(string nome);
        Task<TipoAtracaoModel> Adicionar(TipoAtracaoModel tipoAtracao);
        Task<TipoAtracaoModel> Atualizar(TipoAtracaoModel tipoAtracao, string nome);
        Task<bool> Apagar(string nome);
    }
}
