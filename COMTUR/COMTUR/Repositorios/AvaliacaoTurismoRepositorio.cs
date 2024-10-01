using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class AvaliacaoTurismoRepositorio : IAvaliacaoTurismoRepositorio
	{
		private readonly IAvaliacaoTurismoRepositorio _AvaliacaoTurismoRepositorio;
		private readonly IMapper _mapper;
		private readonly ComturDBContext _dbContext;

		public AvaliacaoTurismoRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}

        public async Task<List<AvaliacaoTurismoModel>> BuscarAvaliacaoTurismoModel()
        {
            return await _dbContext.AvaliacaoTurismo.ToListAsync();
        }

        public async Task<List<AvaliacaoTurismoModel>> BuscarPorIdTurismo(int idTurismo)
        {
            return await _dbContext.AvaliacaoTurismo.Where(x => x.IdTurismo == idTurismo).ToListAsync();
        }

        public async Task<AvaliacaoTurismoModel> BuscarPorId(int id)
		{
			return await _dbContext.AvaliacaoTurismo.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoTurismoModel> Adicionar(AvaliacaoTurismoModel AvaliacaoTurismoModel)
		{

			await _dbContext.AvaliacaoTurismo.AddAsync(AvaliacaoTurismoModel);
			await _dbContext.SaveChangesAsync();

			return AvaliacaoTurismoModel;
		}

        public async Task<AvaliacaoTurismoModel> AtualizarStatus(TipoStatus status, int id)
        {

            AvaliacaoTurismoModel avaliacaoTurismo = await BuscarPorId(id);

            if (avaliacaoTurismo == null)
            {
                throw new Exception($"Avaliação de Atração para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            avaliacaoTurismo.Status = status;

            _dbContext.AvaliacaoTurismo.Update(avaliacaoTurismo);
            await _dbContext.SaveChangesAsync();

            return avaliacaoTurismo;
        }

        public async Task<bool> Apagar(int id)
		{
			AvaliacaoTurismoModel AvaliacaoTurismoModelPorId = await BuscarPorId(id);

			if (AvaliacaoTurismoModelPorId == null)
			{
				throw new Exception($"Avaliação da Atração {id} não encontrada");
			}

			_dbContext.AvaliacaoTurismo.Remove(AvaliacaoTurismoModelPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
