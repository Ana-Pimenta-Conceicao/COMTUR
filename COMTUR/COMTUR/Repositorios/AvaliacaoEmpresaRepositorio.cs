using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Models.Relational;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
	public class AvaliacaoEmpresaRepositorio : IAvaliacaoEmpresaRepositorio
	{
		private readonly IAvaliacaoEmpresaRepositorio _AvaliacaoEmpresaRepositorio;
		private readonly IMapper _mapper;
		private readonly ComturDBContext _dbContext;

		public AvaliacaoEmpresaRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}

        public async Task<List<AvaliacaoEmpresaModel>> BuscarAvaliacaoEmpresaModel()
        {
            return await _dbContext.AvaliacaoEmpresa.ToListAsync();
        }

        public async Task<List<AvaliacaoEmpresaModel>> BuscarPorIdEmpresa(int idEmpresa)
        {
            return await _dbContext.AvaliacaoEmpresa.Where(x => x.IdEmpresa == idEmpresa).ToListAsync();
        }

        public async Task<AvaliacaoEmpresaModel> BuscarPorId(int id)
		{
			return await _dbContext.AvaliacaoEmpresa.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoEmpresaModel> Adicionar(AvaliacaoEmpresaModel AvaliacaoEmpresaModel)
		{

			await _dbContext.AvaliacaoEmpresa.AddAsync(AvaliacaoEmpresaModel);
			await _dbContext.SaveChangesAsync();

			return AvaliacaoEmpresaModel;
		}

        public async Task<AvaliacaoEmpresaModel> AtualizarStatus(TipoStatus status, int id)
        {

            AvaliacaoEmpresaModel avaliacaoEmpresa = await BuscarPorId(id);

            if (avaliacaoEmpresa == null)
            {
                throw new Exception($"Avaliação de Atração para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            avaliacaoEmpresa.Status = status;

            _dbContext.AvaliacaoEmpresa.Update(avaliacaoEmpresa);
            await _dbContext.SaveChangesAsync();

            return avaliacaoEmpresa;
        }

        public async Task<bool> Apagar(int id)
		{
			AvaliacaoEmpresaModel AvaliacaoEmpresaModelPorId = await BuscarPorId(id);

			if (AvaliacaoEmpresaModelPorId == null)
			{
				throw new Exception($"Avaliação da Atração {id} não encontrada");
			}

			_dbContext.AvaliacaoEmpresa.Remove(AvaliacaoEmpresaModelPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
