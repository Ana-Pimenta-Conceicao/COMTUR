using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization.Metadata;

namespace COMTUR.Repositorios
{
    public class AdministradorRepositorio : IAdministradorRepositorio
    {
        private readonly ComturDBContext _dbContext;

        public AdministradorRepositorio(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<AdministradorModel> BuscarPorId(int id)
        {
            return await _dbContext.Administrador.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<AdministradorModel>> BuscarAdministrador()
        {
            return await _dbContext.Administrador.ToListAsync();
        }

        public async Task<AdministradorModel> Adicionar(AdministradorModel administradorModel)
        {
            await _dbContext.Administrador.AddAsync(administradorModel);
            await _dbContext.SaveChangesAsync();

            return administradorModel;
        }

        public async Task<AdministradorModel> Atualizar(AdministradorModel administradorModel, int id)
        {
            AdministradorModel administradorPorId = await BuscarPorId(id);
            if (administradorPorId == null)
            {
                throw new Exception($"Administrador {id} nao foi encontrado no banco de dados. ");
            }

            administradorPorId.Id = administradorModel.Id;
            administradorPorId.Nome = administradorModel.Nome;
            administradorPorId.CpfAdministrador = administradorModel.CpfAdministrador;
            administradorPorId.CargoAdministrador = administradorModel.CargoAdministrador;
            administradorPorId.TelefoneAdministrador = administradorModel.TelefoneAdministrador;
            administradorPorId.EmailAdministrador = administradorModel.EmailAdministrador;
            administradorPorId.SenhaAdministrador = administradorModel.SenhaAdministrador;

            _dbContext.Administrador.Update(administradorPorId);
            await _dbContext.SaveChangesAsync();

            return administradorPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            AdministradorModel administradorPorId = await BuscarPorId(id);

            if (administradorPorId == null)
            {
                throw new Exception($"Administrador {id} não foi encontrado");
            }

            _dbContext.Administrador.Remove(administradorPorId);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}
