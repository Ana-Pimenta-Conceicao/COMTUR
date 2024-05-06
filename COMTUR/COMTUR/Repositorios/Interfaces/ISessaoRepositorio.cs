using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface ISessaoRepositorio
    {
        Task<SessaoModel> AdicionarSessao(SessaoModel sessao);
    }
}
