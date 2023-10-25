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

        public async Task<TipoAtracaoModel> BuscarPorNome(string nome)
        {
            return await _dbContext.TipoAtracao.FirstOrDefaultAsync(x => x.Nome == nome);
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

        public async Task<TipoAtracaoModel> Atualizar(TipoAtracaoModel tipoAtracao, string nome)
        {
            TipoAtracaoModel TipoAtracaoPorNome = await BuscarPorNome(nome);
            if (TipoAtracaoPorNome == null)
            {
                throw new Exception($"Usuário para {nome} nao foi encontrado no banco de dados. ");
            }

            TipoAtracaoPorNome.Nome = tipoAtracao.Nome;

            _dbContext.TipoAtracao.Update(TipoAtracaoPorNome);
            await _dbContext.SaveChangesAsync();

            return TipoAtracaoPorNome;
        }

        public async Task<bool> Apagar(string nome)
        {
            TipoAtracaoModel TipoAtracaoPorNome = await BuscarPorNome(nome);
            if (TipoAtracaoPorNome == null)
            {
                throw new Exception($"Usuário {nome} nao foi encontrado no banco de dados.");
            }

            _dbContext.TipoAtracao.Remove(TipoAtracaoPorNome);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}