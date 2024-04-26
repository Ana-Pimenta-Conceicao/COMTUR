using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class SessaoRepositorio : ISessaoRepositorio
    {
        private readonly ComturDBContext _dbContext;

        public SessaoRepositorio(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<SessaoModel> AdicionarSessao(SessaoModel sessao)
        {
            _dbContext.Sessao.Add(sessao);
            await _dbContext.SaveChangesAsync();

            return sessao;
        }
    }
}
