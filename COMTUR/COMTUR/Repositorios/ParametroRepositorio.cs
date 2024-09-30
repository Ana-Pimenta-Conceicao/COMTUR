using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class ParametroRepositorio : IParametroRepositorio
    {
        private readonly IParametroRepositorio _ParametroRepositorio;
        private readonly IMapper _mapper;
        private readonly ComturDBContext _dbContext;

        public ParametroRepositorio(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ParametroModel> Atualizar(ParametroModel ParametroModel, int id)
        {
            ParametroModel parametroPorId = await BuscarParametroPorId(id);
            if (parametroPorId == null) 
            {
                throw new Exception($"Parametro {id} não foi encontrado no banco de dados.");
            }

            parametroPorId.DefinicaoTurismo = ParametroModel.DefinicaoTurismo;
            parametroPorId.Beneficios = ParametroModel.Beneficios;
            parametroPorId.DataFundacao = ParametroModel.DataFundacao;
            parametroPorId.AreaTerritorial = ParametroModel.AreaTerritorial;
            parametroPorId.DistanciaCapital = ParametroModel.DistanciaCapital;
            parametroPorId.Habitantes = ParametroModel.Habitantes;
            parametroPorId.DescricaoEntreRios = ParametroModel.ImagemEntreRios;
            parametroPorId.DescricaoIT = ParametroModel.DescricaoIT;
            parametroPorId.ImagemIT = ParametroModel.ImagemIT;

         
            _dbContext.Parametro.Update(parametroPorId);
            await _dbContext.SaveChangesAsync();

            return parametroPorId;
        }

        public async Task<ParametroModel> BuscarParametroPorId(int id)
        {
            return await _dbContext.Parametro.Where(x => x.Id == id).FirstOrDefaultAsync();
        }
    }
}
