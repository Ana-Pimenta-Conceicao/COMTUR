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
        private readonly IHostEnvironment _hostEnvironment;

        private string _caminhoImagens = AppContext.BaseDirectory;

        public NoticiaRepository(ComturDBContext dbContext, IHostEnvironment hostEnvironment)
        {
            _dbContext = dbContext;
            _hostEnvironment = hostEnvironment;
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

            _dbContext.Noticia.Update(noticiaPorId);
            await _dbContext.SaveChangesAsync();

            return noticiaPorId;
        }

        public async Task<bool> Apagar(int id)
        {
            var noticiaParaExcluir = await BuscarPorId(id);

            if (noticiaParaExcluir == null)
            {
                return false;
            }

            // Excluir a imagem associada
            await ExcluirImagem(noticiaParaExcluir.ArquivoImagem.FileName);

            _dbContext.Noticia.Remove(noticiaParaExcluir);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> SalvarImagem(IFormFile imagem)
        {
            bool exists = System.IO.Directory.Exists("Imagens");
            if (!exists)
                System.IO.Directory.CreateDirectory("Imagens");

            using (var fileStream = new FileStream("Imagens\\" + imagem.FileName, FileMode.Create))
            {
                await imagem.CopyToAsync(fileStream);
                return true;
            }
            return false;
        }

        public async Task<bool> ExcluirImagem(string nomeImagem)
        {
            string caminhoImagem = Path.Combine(_caminhoImagens, nomeImagem);

            if (System.IO.File.Exists(caminhoImagem))
            {
                System.IO.File.Delete(caminhoImagem);
                return true;
            }

            return false;
        }
    }
}
