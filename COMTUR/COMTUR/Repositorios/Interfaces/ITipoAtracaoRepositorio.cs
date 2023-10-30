using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface ITipoAtracaoRepositorio
    {
        Task<List<TipoAtracaoModel>> BuscarTipoAtracao();
        Task<TipoAtracaoModel> BuscarPorId(int id);
        Task<TipoAtracaoModel> Adicionar(TipoAtracaoModel tipoAtracao);
        Task<TipoAtracaoModel> Atualizar(TipoAtracaoModel tipoAtracao, int id);
        Task<bool> Apagar(int id);
    }
}
