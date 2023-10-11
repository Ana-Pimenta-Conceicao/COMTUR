using Microsoft.EntityFrameworkCore;
using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;

namespace COMTUR.Repositorios
{
    public class TipoAtracaoRepositorio : ITipoAtracaoRepositorio
    {
        private readonly ComturDBContext _dbContext;
        public TipoAtracaoRepositorio(ComturDBContext TipoAtracaoDBContext)
        {
            _dbContext = TipoAtracaoDBContext;
        }

        public async Task<TipoAtracaoModel> BuscarPorId(int id)
        {
            return await _dbContext.TipoAtracao.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<TipoAtracaoModel>> BuscarTipoAtracao()
        {
            return await _dbContext.TipoAtracao.ToListAsync();
        }

        public async Task<TipoAtracaoModel> Adicionar(TipoAtracaoModel tipoAtracao)
        {
            await _dbContext.TipoAtracao.AddAsync(tipoAtracao);
            await _dbContext.SaveChangesAsync();

            return tipoAtracao;
        }

        public async Task<TipoAtracaoModel> Atualizar(TipoAtracaoModel tipoAtracao, int id)
        {
            TipoAtracaoModel TipoAtracaoPorId = await BuscarPorId(id);
            if (TipoAtracaoPorId == null)
            {
                throw new Exception($"Usuário para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            TipoAtracaoPorId.Nome = tipoAtracao.Nome;

            _dbContext.TipoAtracao.Update(TipoAtracaoPorId);
            await _dbContext.SaveChangesAsync();

            return TipoAtracaoPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            TipoAtracaoModel TipoAtracaoPorId = await BuscarPorId(id);
            if (TipoAtracaoPorId == null)
            {
                throw new Exception($"Usuário para o ID: {id} nao foi encontrado no banco de dados. ");
            }

            _dbContext.TipoAtracao.Remove(TipoAtracaoPorId);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}