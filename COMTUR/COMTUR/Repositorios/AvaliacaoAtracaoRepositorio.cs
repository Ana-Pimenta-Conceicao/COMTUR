using AutoMapper;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class AvaliacaoAtracaoRepositorio : IAvaliacaoAtracaoRepositorio
	{
		private readonly IAvaliacaoAtracaoRepositorio _AvaliacaoAtracaoRepositorio;
		private readonly IMapper _mapper;
		private readonly ComturDBContext _dbContext;

		public AvaliacaoAtracaoRepositorio(ComturDBContext dbContext)
		{
			_dbContext = dbContext;
		}

        public async Task<List<AvaliacaoAtracaoModel>> BuscarAvaliacaoAtracaoModel()
        {
            return await _dbContext.AvaliacaoAtracao.ToListAsync();
        }

        public async Task<List<AvaliacaoAtracaoModel>> BuscarPorIdAtracao(int idAtracao)
        {
            return await _dbContext.AvaliacaoAtracao.Where(x => x.IdAtracao == idAtracao).ToListAsync();
        }

        public async Task<AvaliacaoAtracaoModel> BuscarPorId(int id)
		{
			return await _dbContext.AvaliacaoAtracao.Where(x => x.Id == id).FirstOrDefaultAsync();
		}

		public async Task<AvaliacaoAtracaoModel> Adicionar(AvaliacaoAtracaoModel AvaliacaoAtracaoModel)
		{

			await _dbContext.AvaliacaoAtracao.AddAsync(AvaliacaoAtracaoModel);
			await _dbContext.SaveChangesAsync();

			return AvaliacaoAtracaoModel;
		}

        public async Task<AvaliacaoAtracaoModel> AtualizarStatus(TipoStatus status, int id)
        {

            AvaliacaoAtracaoModel avaliacaoAtracao = await BuscarPorId(id);

            if (avaliacaoAtracao == null)
            {
                throw new Exception($"Avaliação de Atração para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            avaliacaoAtracao.Status = status;

            _dbContext.AvaliacaoAtracao.Update(avaliacaoAtracao);
            await _dbContext.SaveChangesAsync();

            return avaliacaoAtracao;
        }

        public async Task<bool> Apagar(int id)
		{
			AvaliacaoAtracaoModel AvaliacaoAtracaoModelPorId = await BuscarPorId(id);

			if (AvaliacaoAtracaoModelPorId == null)
			{
				throw new Exception($"Avaliação da Atração {id} não encontrada");
			}

			_dbContext.AvaliacaoAtracao.Remove(AvaliacaoAtracaoModelPorId);
			await _dbContext.SaveChangesAsync();

			return true;
		}
	}
}
