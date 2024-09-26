using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface IMembroRepositorio
    {
        Task<List<MembroModel>> BuscarMembro();
        Task<MembroModel> BuscarMembroPorId(int id);
        Task<MembroModel> Adicionar(MembroModel Membro);
        Task<MembroModel> Atualizar(MembroModel Membro, int id);
        Task<bool> Apagar(int id);
    }
}
