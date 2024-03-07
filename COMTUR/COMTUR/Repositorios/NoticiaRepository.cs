using COMTUR.Data;
using COMTUR.Models;
using COMTUR.Repositorios.Interfaces;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
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
            // Adiciona a notícia no banco de dados
            await _dbContext.Noticia.AddAsync(noticiaModel);
            await _dbContext.SaveChangesAsync();

            // Se houver imagens associadas à notícia, crie instâncias de NoticiaImagem para cada uma e associe-as à notícia
            if (!string.IsNullOrEmpty(noticiaModel.ArquivoImagem))
            {
                var noticiaImagem = new ImagemNoticiaModel { Imagem = noticiaModel.ArquivoImagem, IdNoticia = noticiaModel.Id };
                _dbContext.ImagemNoticia.Add(noticiaImagem);
                await _dbContext.SaveChangesAsync();
            }

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
            noticiaPorId.LegendaImagem = noticiaDto.LegendaImagem;

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
