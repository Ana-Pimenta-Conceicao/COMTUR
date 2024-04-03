using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace COMTUR.Repositorios
{
    public class NoticiaRepository : INoticiaRepository
    {
        private readonly ComturDBContext _dbContext;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public NoticiaRepository(ComturDBContext dbContext, IWebHostEnvironment hostingEnvironment)
        {
            _dbContext = dbContext;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<NoticiaModel> BuscarPorId(int id)
        {
            return await _dbContext.Noticia.Include(n => n.ImagemNoticia).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<NoticiaModel>> BuscarNoticia()
        {
            return await _dbContext.Noticia.Include(n => n.ImagemNoticia).ToListAsync();
        }

        public async Task<NoticiaModel> Adicionar(NoticiaModel noticiaModel)
        {
            // Adiciona a notícia no banco de dados
            await _dbContext.Noticia.AddAsync(noticiaModel);
            await _dbContext.SaveChangesAsync();

            return noticiaModel;
        }


        public async Task<NoticiaModel> Atualizar(NoticiaModel noticiaDto, int id)
        {
            var noticiaPorId = await BuscarPorId(id);

            if (noticiaPorId == null)
            {
                throw new Exception($"Noticia {id} não foi encontrada no banco de dados.");
            }

            // Atribui os valores do DTO para a entidade NoticiaModel
            noticiaPorId.Titulo = noticiaDto.Titulo;
            noticiaPorId.Subtitulo = noticiaDto.Subtitulo;
            noticiaPorId.Conteudo = noticiaDto.Conteudo;
            noticiaPorId.DataPublicacao = noticiaDto.DataPublicacao;
            noticiaPorId.HoraPublicacao = noticiaDto.HoraPublicacao;


            _dbContext.Noticia.Update(noticiaPorId);
            await _dbContext.SaveChangesAsync();

            return noticiaPorId;
        }


        public async Task<bool> Apagar(int id)
        {
            var noticiaParaExcluir = await BuscarPorId(id);

            if (noticiaParaExcluir == null)
            {
                throw new Exception($"Notícia {id} não foi encontrada");
            }

            _dbContext.Noticia.Remove(noticiaParaExcluir);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<ImagemNoticiaModel>> BuscarImagensPorNoticiaId(int noticiaId)
        {
            // Use o Entity Framework para consultar as imagens associadas a uma notícia específica
            var imagens = await _dbContext.ImagemNoticia
                                           .Where(imagem => imagem.IdNoticia == noticiaId)
                                           .ToListAsync();

            return imagens;
        }

    }
}
