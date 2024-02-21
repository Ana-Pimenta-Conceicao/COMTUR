using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace COMTUR.Repositorios
{
    public class NoticiaRepository : INoticiaRepository
    {
        private readonly ComturDBContext _dbContext;

        private readonly IWebHostEnvironment _hostingEnvironment;

        //private string _caminhoImagens = AppContext.BaseDirectory;

        public NoticiaRepository(ComturDBContext dbContext, IWebHostEnvironment webHostEnvironment)
        {
            _dbContext = dbContext;
            _hostingEnvironment = webHostEnvironment;
        }

        public async Task<NoticiaModel> BuscarPorId(int id)
        {
            return await _dbContext.Noticia.FirstOrDefaultAsync(x => x.Id == id);
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

        public async Task<NoticiaModel> Atualizar(NoticiaModel noticiaModel, int id)
        {
            NoticiaModel noticiaPorId = await BuscarPorId(id);

            if (noticiaPorId == null)
            {
                throw new Exception($"Noticia {id} nao foi encontrado no banco de dados. ");
            }

            noticiaPorId.Id = noticiaModel.Id;
            noticiaPorId.Titulo = noticiaModel.Titulo;
            noticiaPorId.Subtitulo = noticiaModel.Subtitulo;
            noticiaPorId.Conteudo = noticiaModel.Conteudo;
            noticiaPorId.DataPublicacao = noticiaModel.DataPublicacao;
            noticiaPorId.HoraPublicacao = noticiaModel.HoraPublicacao;
            noticiaPorId.LegendaImagem = noticiaModel.LegendaImagem;
            noticiaPorId.ArquivoImagem = noticiaModel.ArquivoImagem;

            _dbContext.Noticia.Update(noticiaPorId);
            await _dbContext.SaveChangesAsync();

            return noticiaPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            var noticiaParaExcluir = await BuscarPorId(id);

            if (noticiaParaExcluir == null)
            {
                throw new Exception($"Notícia {id} não foi encontrado");
            }

            _dbContext.Noticia.Remove(noticiaParaExcluir);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}