using COMTUR.Models;

namespace COMTUR.Repositorios.Interfaces
{
    public interface IParametroRepositorio
    {
    
        Task<ParametroModel> BuscarParametroPorId(int id);
        Task<ParametroModel> Atualizar(ParametroModel ParametroModel, int id);
      
    }
}
