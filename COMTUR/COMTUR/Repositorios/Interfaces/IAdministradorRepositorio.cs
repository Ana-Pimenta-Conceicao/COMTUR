using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface IAdministradorRepositorio
    {
        Task<List<AdministradorModel>> BuscarAdministrador();
        Task<AdministradorModel> BuscarPorId(int id);
        Task<AdministradorModel> Adicionar(AdministradorModel administrador);
        Task<AdministradorModel> Atualizar(AdministradorModel administrador, int id);
        Task<bool> Apagar(int id);
    }
}
