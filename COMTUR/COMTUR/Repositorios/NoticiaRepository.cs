using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace COMTUR.Repositorios
{
    public class NoticiaRepository : INoticiaRepository
    {
        private readonly ComturDBContext _dbContext;

        public NoticiaRepository(ComturDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<NoticiaModel> BuscarPorNome(string titulo)
        {
            return await _dbContext.Noticia.FirstOrDefaultAsync(x => x.Titulo == titulo);
        }

        public async Task<List<NoticiaModel>> BuscarNoticia()
        {
            return await _dbContext.Noticia.ToListAsync();
        }

        public async Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel)
        {
            await _dbContext.Noticia.AddAsync(noticiaModel);
            await _dbContext.SaveChangesAsync();

            return noticiaModel;
        }

        public async Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, string titulo)
        {
            NoticiaModel noticiaPorNome = await BuscarPorNome(titulo);
            if (noticiaPorNome == null)
            {
                throw new Exception($"Noticia {titulo} nao foi encontrado no banco de dados. ");
            }

            noticiaPorNome.Titulo = noticiaModel.Titulo;

            _dbContext.Noticia.Update(noticiaPorNome);
            await _dbContext.SaveChangesAsync();

            return noticiaPorNome;
        }

        public async Task<bool> Apagar(string titulo)
        {
            var noticiaParaExcluir = await BuscarPorNome(titulo);

            if (noticiaParaExcluir == null)
            {
                return false; 
            }

            _dbContext.Noticia.Remove(noticiaParaExcluir); 
            await _dbContext.SaveChangesAsync(); 

            return true;
        }
    }
}
